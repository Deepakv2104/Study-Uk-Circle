import React, { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
// import { useLocation } from "react-router-dom";
import{Avatar} from "@mui/material";
  import {
    doc,
    getDoc,
    // updateDoc,
    // collection,
    // query,
    // where,
    // getDocs,
    // onSnapshot,
  } from "firebase/firestore";
//   import intToRoman from "./RomanNo";
import {
Grid,
  Typography,
  // Button,
  Link,
} from "@mui/material";
import {  GitHub, LinkedIn, Twitter, Language } from "@mui/icons-material";
// import ProjectCount from "./ProjectCount";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Box
} from "@mui/material";
// import { IconButton } from "@material-ui/core";
  // import { useAuth } from "../../auth/userProvider/AuthProvider";
  import { firestore } from "../../../firebase";
  import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';


const StudentProfile = () => {
    const { userId } = useParams();
  // const location = useLocation();
  // const { user } = useAuth();
  const [userData, setUserData] = useState({});
  // const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
        try {
            if (userId) {
                // Get document reference for the user with the provided studentId
                const userDocRef = doc(firestore, "users", userId);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    // If document exists, set userData state with document data
                    const userData = userDocSnapshot.data();
                    setUserData(userData);
                } else {
                    console.log("User document not found");
                }
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    fetchUserData();
}, [userId]);




  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleEditDone = () => {
  //   setIsEditing(false);
  // };

  return (
    <div style={{marginTop:'20px'}}>
      {/* Conditionally render EditProfile component */}

      {/* Conditionally render EditProfile component based on isEditing state */}
      {/* {isEditing && <EditProfile onEditDone={handleEditDone} />} */}

      <Grid container spacing={2}>
        {/* Left Grid (30%) */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={2} >
            {/* Left Top Grid (70% of the left grid) */}
            <Grid item xs={12} style={{ height: "40%" }}>
              <Box
              className="card"
                style={{
                  height: "84%",
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // Center the content horizontally
                  justifyContent: "center", // Center the content vertically
                }}
              >
                {/* Content for the left top grid */}
                {/* <ProfileAvatar userId={studentId} /> */}
                <Avatar  sx={{ width: 100, height: 100 }}/>
                <Typography variant="h6" align="center">
                  {userData.rollNo}
                </Typography>
                <Typography variant="h6" align="center" className="username">
                  {userData.name || "User"}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} style={{ height: "100%" }}>
              <Box className="card" style={{ height: "60%", padding: 20 }}>
                {/* Content for the left bottom grid */}
                <h2>Social Links </h2>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Language sx={{ color: "#4caf50", marginRight: 15 }} />{" "}
                        {/* Globe icon for website */}
                        <Link
                          href={userData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography style={{color:"white"}}>
                          Website
                          </Typography>
                      
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <GitHub sx={{ color: "#000", marginRight: 15 }} />
                        <Link
                          href={userData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                      <Typography style={{color:"white"}}>
                          GitHub
                          </Typography>
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <LinkedIn sx={{ color: "#0077b5", marginRight: 15 }} />
                        <Typography style={{color:"white"}}>
                         LinkedIn
                          </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Twitter sx={{ color: "#1da1f2", marginRight: 15 }} />
                        <Link
                          href={userData.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Typography style={{color:"white"}}>
                         Twitter
                          </Typography>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box >
            </Grid>
          </Grid>
        </Grid>

        {/* Right Grid (70%) */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={2} style={{ height: "100%" }}>
            {/* Right Top Grid */}
            <Grid item xs={12}>
              {/* Display student details */}
              <Grid container spacing={2} style={{ height: "100%" }}>
                <Grid item xs={12}>
                  <Box className="card"
                    style={{ height: "100%", padding: 20, overflo: "auto" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h2>Student Details</h2>
                      {/* {(userId === studentId || !studentId) && !isEditing && (
                        <IconButton
                          onClick={handleEditClick}
                          style={{
                            color: "blue",
                            fontSize: "14px",
                            padding: "8px 16px",
                            marginLeft: "10px",
                          }}
                        >
                          <Edit />
                        </IconButton>
                      )} */}
                    </div>

                    <Grid item xs={12}>
                      <TableContainer >
                        <Table>
                          <TableBody style={{ height: "100%" }}>
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  color="white"
                                >
                                  Name:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1" color="white">
                                  {userData.name}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            {/* <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  Branch:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {userData.branch}
                                </Typography>
                              </TableCell>
                            </TableRow> */}
                            {/* <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  Year:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {userData.year}
                                </Typography>
                              </TableCell>
                            </TableRow> */}
                            {/* <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  Section:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {userData.section}
                                </Typography>
                              </TableCell>
                            </TableRow> */}
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  color="white"
                                >
                                  City:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1" color="white">
                                  {userData.city}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  color="white"
                                >
                                  State:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1" color="white">
                                  {userData.state}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                  color="white"
                                >
                                  Country:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1" color="white">
                                  {userData.country}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Box >
                </Grid>
              </Grid>
            </Grid>
            {/* Right Bottom Grid (divided vertically) */}
        
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentProfile;