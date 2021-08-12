// import React, { useCallback, useEffect, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { useDispatch, useSelector } from "react-redux";
// // import { addImage } from "../TierlistView/imageSlice";

// function FileDropper() {
//   let [image, setImage] = useState(null);

//   const dispatch = useDispatch();
//   const images = useSelector((state) => state.images);

//   const onDrop = useCallback(async (acceptedFiles) => {
//     let ObjectURL = [];
//     //can't use foreach because await wont'work

//     for (let file in acceptedFiles) {
//       let imageURL = URL.createObjectURL(file);

//       ObjectURL.push(imageURL);
//       await dispatch(addImage({ source: file, imageURL }));
//     }

//     // dispatch(addItem());
//   }, []);

//   useEffect(() => {}, [image]);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div {...getRootProps()}>
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the files here ...</p>
//       ) : (
//         <p>Drag 'n' drop some files here, or click to select files</p>
//       )}
//       <div>
//         {images.map((item, index) => {
//           return (
//             <img
//               style={{ height: "100px", objectFit: "cover" }}
//               key={index}
//               src={item}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default FileDropper;
