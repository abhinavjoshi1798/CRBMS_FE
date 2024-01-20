import { Heading, Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

const AddUserUi = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [role, setRole] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [city, setCity] = useState("");
  const [building, setBuilding] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [userData, setUserData] = useState([]);
  const [handleAddUserBtnClick, setHandleAddUserBtnClick] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/admin/userdata`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUserData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [handleAddUserBtnClick]);

  const handleAddUser = () => {
    let obj = {
      name,
      email,
      pass,
      role,
      employeeId,
      city,
      building,
    };
    console.log(obj);

    fetch("http://localhost:8080/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setModalContent("User added successfully!");
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmail("");
    setName("");
    setPass("");
    setRole("");
    setEmployeeId("");
    setCity("");
    setBuilding("");
    setHandleAddUserBtnClick(!handleAddUserBtnClick);
  };

  return (
    // <div
    //   style={{
    //     width: "100%",
    //     margin: "auto",
    //     height: "100%",
    //     display: "flex",
    //   }}
    // >
    //   <div
    //     style={{
    //       width: "60%",
    //       border: "2px solid yellow",
    //       display: "flex",
    //       alignItems: "center",
    //       justifyContent: "center",
    //     }}
    //   >
    //     <div
    //       style={{
    //         border: "1px solid brown",
    //         padding: "20px",
    //         borderRadius: "20px",
    //       }}
    //     >
    //       <h3>Add User</h3>
    //       <table>
    //         <tr>
    //           <td>
    //             <label className="AddUserFromLabel">Name</label>
    //           </td>
    //           <td>
    //             <input
    //               type="text"
    //               value={name}
    //               onChange={(e) => setName(e.target.value)}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <label className="AddUserFromLabel">Email</label>
    //           </td>
    //           <td>
    //             <input
    //               type="text"
    //               value={email}
    //               onChange={(e) => setEmail(e.target.value)}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <label className="AddUserFromLabel">Pass</label>
    //           </td>
    //           <td>
    //             <input
    //               type="text"
    //               value={pass}
    //               onChange={(e) => setPass(e.target.value)}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <label className="AddUserFromLabel">Role</label>
    //           </td>
    //           <td>
    //             <input
    //               type="text"
    //               value={role}
    //               onChange={(e) => setRole(e.target.value)}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <label className="AddUserFromLabel">Employee ID</label>
    //           </td>
    //           <td>
    //             {" "}
    //             <input
    //               type="number"
    //               value={employeeId}
    //               onChange={(e) => setEmployeeId(e.target.value)}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <label className="AddUserFromLabel">City</label>
    //           </td>
    //           <td>
    //             <input
    //               type="text"
    //               value={city}
    //               onChange={(e) => setCity(e.target.value)}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td>
    //             <label className="AddUserFromLabel">Building</label>
    //           </td>
    //           <td>
    //             <input
    //               type="text"
    //               value={building}
    //               onChange={(e) => setBuilding(e.target.value)}
    //             />
    //           </td>
    //         </tr>
    //         <tr>
    //           <td></td>
    //           <td>
    //             <button
    //               type="button"
    //               class="btn btn-primary"
    //               onClick={handleAddUser}
    //             >
    //               Add User
    //             </button>
    //           </td>
    //         </tr>
    //       </table>

    //       <div
    //         className={`modal fade ${showModal ? "show" : ""}`}
    //         id="exampleModal"
    //         tabIndex="-1"
    //         aria-labelledby="exampleModalLabel"
    //         aria-hidden={!showModal}
    //         style={{ display: showModal ? "block" : "none" }}
    //       >
    //         <div className="modal-dialog">
    //           <div className="modal-content">
    //             <div className="modal-header">
    //               <h5 className="modal-title" id="exampleModalLabel">
    //                 User Added Successfully
    //               </h5>
    //               <button
    //                 type="button"
    //                 className="btn-close"
    //                 data-bs-dismiss="modal"
    //                 aria-label="Close"
    //                 onClick={handleCloseModal}
    //               ></button>
    //             </div>
    //             <div className="modal-body">{modalContent}</div>
    //             <div className="modal-footer">
    //               <button
    //                 type="button"
    //                 className="btn btn-secondary"
    //                 data-bs-dismiss="modal"
    //                 onClick={handleCloseModal}
    //               >
    //                 Close
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* <div style={{ width: "40%", border: "2px solid green" }}>
    //     <div style={{marginTop:"50px"}}>
    //       <h3>USERS</h3>
    //       {
    //         userData?.map((el) => {
    //           return (<div>
    //             <p style={{fontWeight:"500",
    //           fontSize:"22px"}}>{el.name}</p>
    //           <span>{el.employeeId}</span><span>{el.city}{", "}{el.building}</span>
    //           <p>{el.email}</p>

    //             </div>)
    //         })
    //       }

    //     </div>

    //   </div> */}

    //   {/* <div
    //     style={{
    //       width: "40%",
    //       border: "2px solid green",
    //       overflow: "auto",
    //       maxHeight: "100vh",
    //     }}
    //   >
    //     <div style={{ marginTop: "50px" }}>
    //       <h3>USERS</h3>
    //       {userData?.map((el) => (
    //         <div key={el.employeeId}>
    //           <p style={{ fontWeight: "500", fontSize: "22px" }}>{el.name}</p>
    //           <span>{el.employeeId}</span>
    //           <span>
    //             {el.city}, {el.building}
    //           </span>
    //           <p>{el.email}</p>
    //         </div>
    //       ))}
    //     </div>
    //   </div> */}

    // </div>
    <>
      <Box>
        <Heading>Add User</Heading>
      </Box>
    </>
  );
};

export default AddUserUi;
