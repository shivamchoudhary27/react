import React, { useEffect, useMemo, useState } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getLatestWeightForCategory } from "./utils";
import { deleteData as deleteCategoryData, putData, postData } from "../../../adapters/microservices";
import { getDragnDropAction, getItemsToUpdate, updateWeights } from './local';
import moveIcon from "../../../assets/images/icons/move-action.svg";
import plusIcon from "../../../assets/images/icons/plus-action.svg";
import editIcon from "../../../assets/images/icons/edit-action.svg";
import deleteIcon from "../../../assets/images/icons/delete-action.svg";
import showIcon from "../../../assets/images/icons/show-action.svg";
import hideIcon from "../../../assets/images/icons/hide-action.svg";

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
  getDeleteCategoryID
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
            <img src={moveIcon} alt="Move category" className="me-3" />{row.values.name}
          </div>
        );
      },
    },
    {
      Header: "Add Subcategory",
      accessor: "subCategory",
      Cell: ({ row }: any) => (
        <>
          {row.original.courses.length === 0
          &&
          <Link className="action-icons small-icon" to="" onClick={() => addSubCategoryHandler(row.original.id)}>
            <img src={plusIcon} alt="Add Subcategory" />
          </Link>
          }
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
          <Link className="action-icons" to="">
            <img src={editIcon} alt="Edit" onClick={() => {
                editHandler(row.original.id, row.original.name, row.original.weight, row.original.parent);
              }} />
          </Link>
          <Link className={`action-icons ${row.original.canBeDeleted !== false ? '' : 'disabled'}`} to="">
            <img 
              src={deleteIcon} alt="Delete" 
              onClick={() => row.original.canBeDeleted !== false ? getDeleteCategoryID(row.original.id) : null} 
            />
          </Link>{" "}
          <Link className="action-icons" to="" onClick={() => {
            toggleCategoryPublished(row.original)
          }}
          >
            <img src={row.original.published !== false ? showIcon : hideIcon} alt="Show" />
          </Link>
        </span>
      ),
    },
  ]; 

  const [selectedData, setSelectedData] = useState<any>(categoryData);
  const columns = useMemo(() => tableColumn, []);
  const data = useMemo(() => selectedData, [selectedData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const [updateSource, setUpdateSource] = useState<any>({data: {}, status : 'raw'});
  const [newWeightsItems, setNewWeightsItems] = useState<any>({data: {}, status : 'raw'});
  const [forceRender, setForceRender] = useState(false);

  useEffect(() => {
    if (categoryData.length > 0) setSelectedData(categoryData)
  }, [categoryData])

  useEffect(() => {
    if (updateSource.status === 'updated' && newWeightsItems.status === 'updated') {
      const mergedItems = [...newWeightsItems.data, updateSource.data];
      console.log('mergedItems', mergedItems);
      saveUpdatedCategoriesOrder(mergedItems);
    }
  }, [updateSource, newWeightsItems]);

  const toggleCategoryPublished = (categoryPacket: any) => { 
    categoryPacket.published = !categoryPacket.published;
    setForceRender(prevState => !prevState);
    let endPoint = `${id}/category/${categoryPacket.id}`;
    putData(endPoint, categoryPacket)
      .then((res: any) => {
        setForceRender(prevState => !prevState);
      })
      .catch((err: any) => {
        window.alert('Action failed due to some error');
        categoryPacket.published = !categoryPacket.published
        setForceRender(prevState => !prevState);
      });
  }
  
  // Drag & Drop handler method === >>
  const handleDragEnd = (results: any) => {
    if (!results.destination) return;
    // call to update the new position in data
    let catShifting = results.source.index;
    let toMoved = results.destination.index;
    if (categoryData[catShifting].level < categoryData[toMoved].level) {
      window.alert('Can not move parent to child level, leaving it\'s children categories orphaned');
      return;  // in progress....  (has to be well defined the logic, can not move to only it's own child)
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
    
    setUpdateSource({data: updateSrcProperties, status : 'updated'});  // update source parent and weight
    generateFilterMetadata(catShifting, toMoved)
  };
  

  const generateFilterMetadata = (source: number, destination : number) => {
    const sourceObj = categoryData[source]
    const destinationObj = categoryData[destination]
    const dragAction = getDragnDropAction(sourceObj, destinationObj);
    const itemsToEffect = getItemsToUpdate(selectedData, dragAction, sourceObj, destinationObj);
    const updatedItems = updateWeights(itemsToEffect, dragAction);
    setNewWeightsItems({data: updatedItems, status: 'updated'});
  }

  const saveUpdatedCategoriesOrder = (items : any) => {
    const endPoint = `${id}/category/bulk`;    
    postData(endPoint, items).then((res: any)=>{
      if(res.status === 200){
        console.log('categories bulk sort update', res);
        refreshcategories();
      }
    }).catch((err: any)=>{
      console.log(err)
    })
  }

  const dragActionSave = (catShifting : number, toMoved : number) => {
    const endPoint = `${id}/category/${categoryData[catShifting].id}`;
    let updatePosition = {name: categoryData[catShifting].name, 
                       parent : categoryData[toMoved].parent, 
                       weight : categoryData[toMoved].weight};

    putData(endPoint, updatePosition)
    .then((res: any) => {
      refreshcategories();
    }).catch((err: any) => {
      window.alert('Some error occurred!');
    })
  }

  // category Table Elements Update handler === >>
  const editHandler = (id: number, name: string, weight: number, parent: number) => {
    setEditCategoryValues({id, name, weight, parent});
    toggleModalShow(true);
  };

  // category Table Elements Delete handler === >>
  const deleteHandler = (delID: number) => {
    // if (window.confirm('Are you sure to delete this category?')) {
    //   updatedeleterefresh(false);
    //   const endPoint = `${id}/category/${delID}`;
    //   deleteCategoryData(endPoint)
    //   .then((res: any) => {
    //     if (res.status === 200) {
    //       console.log(res.data);
    //       updatedeleterefresh(true);
    //     } else if (res.status === 500) {
    //       window.alert('Unable to delete, this category might have come courses');
    //     } 
    //   }).catch((result : any) => {
    //     if (result.response.status === 500) {
    //       window.alert('Unable to delete, this category might have come courses');
    //     }            
    //   });
    // }
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

  const setLevelPadding = (level : number) => {
    let padding = ((level - 1) * 50) + "px";
      return padding;
  }

  return (
    <>
      {/* {categoryData.length === 0 && <TableSkeleton numberOfRows={5} numberOfColumns={4} />} */}
      <div className="table-responsive table-wrapper mt-3">
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
                    // console.log(row);
                    prepareRow(row);
                    return (
                      <Draggable
                        draggableId={`drag-id-${row.original.id.toString()}`}
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
      </div>
    </>
  );
};

export default CategoryTable;
