import React from "react";

export const getLatestWeightForCategory = (id, fullArray) => {
    let weight = -1;
    for (let i=0; i < fullArray.length; i++) {
       if (fullArray[i].parent === id) {
          weight = (fullArray[i].weight > weight) ? fullArray[i].weight : weight;
       }
    }
    
    return ++weight;
}

export const updateCategoryLevels = (data, parentId, level) => {
   data.filter(item => item.parent === parentId).forEach(item => {
     item.level = level;
     updateCategoryLevels(data, item.id, level + 1);
   });
}

export const getChildren = (parent, arr) => {
   let children =  arr.filter(item => item.parent === parent.id)
             .sort((a,b) => a.weight - b.weight)
             .reduce((acc, child) => [...acc, child, ...getChildren(child, arr)], []);
   return children;
}

export const getParentChildren = (parent, arr) => {

   let children =  arr.filter(item => item.parent === parent.id)
             .sort((a,b) => a.weight - b.weight);
   return children;   
}

export const generateIndentation = (level: number) => {
   const indentation = Array(level).fill(<>&nbsp;</>).map((nbsp, index) => (
     <React.Fragment key={index}>{nbsp}</React.Fragment>
   ));
   return indentation;
 }

export const generateSubCategoryOption = (item: any) => {
   const indentation = (item.level === 2) ? generateIndentation(0) : generateIndentation(item.level + 1);
   return (
     <option key={item.id} value={item.id} disabled>{indentation} {item.name}</option>
   )
 }

export const renderCourse = (courses: any, level: number) => {
   const indentation = generateIndentation(level * 3);
   return (
     <>
       {courses.map((course: any) => {
         return (<option value={course.id} key={course.id}>{indentation}{course.name}</option>)
       })}
     </>
   )
 }

export const handleChildrens = (parentCategory: any, categories: any) => {
   const children = getParentChildren(parentCategory, categories)
   return (
     <React.Fragment>
       {children.map((child: any) => {
         return (
           <React.Fragment key={child.id}>
             {generateSubCategoryOption(child)}
             {child.haschild === true ? 
               handleChildrens(child, categories) :
               renderCourse(child.courses, child.level)
             }
           </React.Fragment>
         )
       })}
     </React.Fragment>
   )
 }