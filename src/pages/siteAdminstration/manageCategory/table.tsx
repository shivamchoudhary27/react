import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getLatestWeightForCategory } from "./utils";
import {
  deleteData as deleteCategoryData,
  putData,
  postData,
} from "../../../adapters/microservices";
import { getDragnDropAction, getItemsToUpdate, updateWeights } from "./local";
import moveIcon from "../../../assets/images/icons/move-action.svg";
import plusIcon from "../../../assets/images/icons/plus-action.svg";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";
import TableSkeleton from "../../../widgets/skeleton/table";
import Errordiv from "../../../widgets/alert/errordiv";
import DeleteAlert from "../../../widgets/alert/deleteAlert";
import { useDispatch } from "react-redux";
import { globalAlertActions } from "../../../store/slices/globalAlerts";
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2";

// Actions btns styling === >>>
const actionsStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
};

const CategoryTable = ({
  categoryData,
  toggleModalShow,
  id,
  setFormParentValue,
  setFormWeightValue,
  updatedeleterefresh,
  setEditCategoryValues,
  refreshcategories,
  cleanFormValues,
  getDeleteCategoryID,
  apiStatus,
  categoryPermission
}: any) => {
  const tableColumn = [
    {
      Header: "Categories",
      accessor: "name",
      Cell: ({ row }: any) => {
        return (
          <div
            style={{
              paddingLeft: setLevelPadding(row.original.level),
            }}
          >
            <img src={moveIcon} alt="Move category" className="me-3" />
            {row.values.name}
          </div>
        );
      },
    },
    {
      Header: "Add Subcategory",
      accessor: "subCategory",
      Cell: ({ row }: any) => (
        <>
          {categoryPermission.canAdd && row.original.courses.length === 0 && (
            <Link
              className="action-icons small-icon"
              to=""
              onClick={() => addSubCategoryHandler(row.original.id)}
            >
              <img src={plusIcon} alt="Add Subcategory" />
            </Link>
          )}
        </>
      ),
    },
    {
      Header: "Courses",
      accessor: "courses",
      Cell: ({ row }: any) => <p>{row.original.courses.length}</p>,
    },
    {
      Header: "Actions",
      Cell: ({ row }: any) => (
        <span style={actionsStyle}>
          {categoryPermission.canEdit &&
        //   <OverlayTrigger
        //   placement="top"
        //   overlay={<Tooltip>Delete User</Tooltip>}
        //   trigger="hover"
        //  >
            <Link className="action-icons" to="">
              <img
                src={editIcon}
                alt="Edit"
                onClick={() => {
                  editHandler(
                    row.original.id,
                    row.original.name,
                    row.original.weight,
                    row.original.parent
                  );
                }}
              />
            </Link>
            // </OverlayTrigger>
          }
          {categoryPermission.canDelete &&
            <Link
              className={`action-icons ${
                row.original.canBeDeleted !== false ? "" : "disabled"
              }`}
              to=""
            >
              <img
                src={deleteIcon}
                alt="Delete"
                onClick={() =>
                  row.original.canBeDeleted !== false
                    ? deleteHandler(row.original.id)
                    : null
                }
              />
            </Link>
          }
          {categoryPermission.canEdit &&
            <Link
              className="action-icons"
              to=""
              onClick={() => {
                toggleCategoryPublished(row.original);
              }}
            >
              <img
                src={row.original.published !== false ? showIcon : hideIcon}
                alt="Show"
              />
            </Link>
          }
        </span>
      ),
    },
  ];
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState<any>(categoryData);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => selectedData, [selectedData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [updateSource, setUpdateSource] = useState<any>({
    data: {},
    status: "raw",
  });
  const [newWeightsItems, setNewWeightsItems] = useState<any>({
    data: {},
    status: "raw",
  });
  const [forceRender, setForceRender] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ message: "", alertBoxColor: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [onDeleteAction, setOnDeleteAction] = useState("");
  const [deleteId, setDeleteId] = useState(0);

  useEffect(() => {
    if (categoryData.length > 0) setSelectedData(categoryData);
  }, [categoryData]);

  useEffect(() => {
    if (
      updateSource.status === "updated" &&
      newWeightsItems.status === "updated"
    ) {
      const mergedItems = [...newWeightsItems.data, updateSource.data];
      saveUpdatedCategoriesOrder(mergedItems);
    }
  }, [updateSource, newWeightsItems]);

  const toggleCategoryPublished = (categoryPacket: any) => {
    categoryPacket.published = !categoryPacket.published;
    setForceRender((prevState) => !prevState);
    let endPoint = `${id}/category/${categoryPacket.id}`;
    putData(endPoint, categoryPacket)
      .then((res: any) => {
        setForceRender((prevState) => !prevState);
      })
      .catch((err: any) => {
        dispatch(globalAlertActions.globalAlert({alertMsg: "Action failed due to some error", status: true}))
        categoryPacket.published = !categoryPacket.published;
        setForceRender((prevState) => !prevState);
      });
  };

  // Drag & Drop handler method === >>
  const handleDragEnd = (results: any) => {
    if (!results.destination) return;
    // call to update the new position in data
    let catShifting = results.source.index;
    let toMoved = results.destination.index;
    if (categoryData[catShifting].level < categoryData[toMoved].level) {
      dispatch(globalAlertActions.globalAlert({
        alertMsg: "Can not move parent to child level, leaving it's children categories orphaned", 
        status: true
      }))

      return; // in progress....  (has to be well defined the logic, can not move to only it's own child)
    }

    let temp = [...selectedData];
    let [selectedRow] = temp.splice(results.source.index, 1);
    temp.splice(results.destination.index, 0, selectedRow);
    setSelectedData(temp);

    let updateSrcProperties = {
      id: categoryData[catShifting].id,
      name: categoryData[catShifting].name,
      weight: categoryData[toMoved].weight,
      parent: categoryData[toMoved].parent,
    };

    setUpdateSource({ data: updateSrcProperties, status: "updated" }); // update source parent and weight
    generateFilterMetadata(catShifting, toMoved);
  };

  const generateFilterMetadata = (source: number, destination: number) => {
    const sourceObj = categoryData[source];
    const destinationObj = categoryData[destination];
    const dragAction = getDragnDropAction(sourceObj, destinationObj);
    const itemsToEffect = getItemsToUpdate(
      selectedData,
      dragAction,
      sourceObj,
      destinationObj
    );
    const updatedItems = updateWeights(itemsToEffect, dragAction);
    setNewWeightsItems({ data: updatedItems, status: "updated" });
  };

  const saveUpdatedCategoriesOrder = (items: any) => {
    const endPoint = `${id}/category/bulk`;
    postData(endPoint, items)
      .then((res: any) => {
        if (res.status === 200) {
          refreshcategories();
        }
      })
      .catch((err: any) => {
        console.log(err);
        dispatch(globalAlertActions.globalAlert({alertMsg: "Some error occurred!", status: true}))
      });
  };

  const dragActionSave = (catShifting: number, toMoved: number) => {
    const endPoint = `${id}/category/${categoryData[catShifting].id}`;
    let updatePosition = {
      name: categoryData[catShifting].name,
      parent: categoryData[toMoved].parent,
      weight: categoryData[toMoved].weight,
    };

    putData(endPoint, updatePosition)
      .then((res: any) => {
        refreshcategories();
      })
      .catch((err: any) => {
        dispatch(globalAlertActions.globalAlert({alertMsg: "Some error occurred!", status: true}))
      });
  };

  // category Table Elements Update handler === >>
  const editHandler = (
    id: number,
    name: string,
    weight: number,
    parent: number
  ) => {
    setEditCategoryValues({ id, name, weight, parent });
    toggleModalShow(true);
  };

  // category Table Elements Delete handler === >>
  useEffect(() => {
    if (onDeleteAction === "Yes") {
      updatedeleterefresh(false);
      const endPoint = `${id}/category/${deleteId}`;
      deleteCategoryData(endPoint)
        .then((res: any) => {
          if (res.status === 200) {
            Swal.fire({
              timer: 3000,
              width: "25em",
              color: "#666",
              icon: "success",
              background: "#e7eef5",
              showConfirmButton: false,
              text: "Category has been successfully deleted"
            });
            updatedeleterefresh(true);
          }
        })
        .catch((result: any) => {
          if (result.response.status === 500|| 400 || 404) {
            setShowAlert(true);
            Swal.fire({
              timer: 4000,
              width: "25em",
              color: "#666",
              icon: "error",
              background: "#e7eef5",
              showConfirmButton: false,
              text: `${result.response.data.message}`,
            });
          }

        });
    }
    setOnDeleteAction("");
  }, [onDeleteAction]);

  // delete event handler === >>>
  const deleteHandler = (delID: number) => {
    updatedeleterefresh(false);
    setShowDeleteModal(true);
    setDeleteId(delID);
  };

  // getting onDelete Modal Action === >>>
  const deleteActionResponse = (action: string) => {
    setOnDeleteAction(action);
    setShowDeleteModal(false);
  };

  // category Table Elements hide/show toggle handler === >>
  const showToggleHandler = (id: number) => {
    console.log(id);
  };

  // handle to add new sub category === >>
  const addSubCategoryHandler = (id: number) => {
    cleanFormValues();
    let largestWeight = getLatestWeightForCategory(id, categoryData);
    setFormParentValue(id);
    setFormWeightValue(largestWeight);
    toggleModalShow(true);
  };

  const setLevelPadding = (level: number) => {
    let padding = (level - 1) * 50 + "px";
    return padding;
  };

  return (
    <>
      {/* <TimerAlertBox
        alertMsg={alertMsg.message}
        className="mt-3"
        variant={alertMsg.alertBoxColor}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
      /> */}
      <div className="table-responsive admin-table-wrapper mt-3">
        <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
          <Table borderless striped {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps()} key={index}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <Droppable droppableId="tbody">
              {(provided) => (
                <tbody
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  {...getTableBodyProps()}
                >
                  {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                      <Draggable
                        draggableId={`drag-id-${row.id.toString()}`}
                        index={index}
                        key={row.id.toString()}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...row.getRowProps()}
                          >
                            {row.cells.map((cell, index) => (
                              <td
                                {...provided.dragHandleProps}
                                {...cell.getCellProps()}
                                key={index}
                              >
                                {cell.render("Cell")}
                              </td>
                            ))}
                          </tr>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </Table>
        </DragDropContext>
        {apiStatus === "started" && selectedData.length === 0 && (
          <TableSkeleton numberOfRows={5} numberOfColumns={4} />
        )}
        {apiStatus === "finished" && selectedData.length === 0 && (
          <Errordiv msg="No record found!" cstate className="mt-3" />
        )}
      </div>
      <DeleteAlert
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        deleteActionResponse={deleteActionResponse}
        modalHeading="Category"
      />
    </>
  );
};

export default CategoryTable;
