import React, { useState, useEffect } from "react";
import { useNavigate ,useParams} from "react-router-dom";
import { useLocation } from "react-router-dom";
import{Avatar} from "@mui/material";
  import {
    doc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
  } from "firebase/firestore";
//   import intToRoman from "./RomanNo";
import {
Grid,
  Typography,
  Button,
  Link,
} from "@mui/material";
import { Web, GitHub, LinkedIn, Twitter, Language } from "@mui/icons-material";
// import ProjectCount from "./ProjectCount";
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Paper
} from "@mui/material";
// import { IconButton } from "@material-ui/core";
  import { useAuth } from "../../auth/userProvider/AuthProvider";
  import { firestore } from "../../firebase";
  import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';


const StudentProfile = () => {
    const { userId } = useParams();
  const location = useLocation();
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [isEditing, setIsEditing] = useState(false);


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




  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditDone = () => {
    setIsEditing(false);
  };

  return (
    <div style={{margin:'30px'}}>
      {/* Conditionally render EditProfile component */}

      {/* Conditionally render EditProfile component based on isEditing state */}
      {/* {isEditing && <EditProfile onEditDone={handleEditDone} />} */}

      <Grid container spacing={2} >
        {/* Left Grid (30%) */}
        <Grid item xs={12} md={3}>
          <Grid container spacing={2} >
            {/* Left Top Grid (70% of the left grid) */}
            <Grid item xs={12} style={{ height: "40%" }}>
              <Paper
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
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ height: "100%" }}>
              <Paper style={{ height: "60%", padding: 20 }}>
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
                          Website
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <GitHub sx={{ color: "#333", marginRight: 15 }} />
                        <Link
                          href={userData.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </Link>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <LinkedIn sx={{ color: "#0077b5", marginRight: 15 }} />
                        <Link
                          href={userData.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </Link>
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
                          Twitter
                        </Link>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
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
                  <Paper
                    style={{ height: "90%", padding: 20, overflo: "auto" }}
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
                      <TableContainer style={{ maxHeight: "80%" }}>
                        <Table>
                          <TableBody style={{ height: "60%" }}>
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  Name:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
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
                                >
                                  City:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {userData.city}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  State:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {userData.state}
                                </Typography>
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>
                                <Typography
                                  variant="subtitle1"
                                  fontWeight="bold"
                                >
                                  Country:
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {userData.country}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            {/* Right Bottom Grid (divided vertically) */}
            <Grid item xs={12} md={6}>
              <Paper style={{ height: "100%", padding: 20 }}>
                {/* Content for the right bottom left grid */}
                <h2>Skills</h2>

                <div className="skills">
                  <ul>
                    {Array.isArray(userData.skills) &&
                    userData.skills.length > 0 ? (
                      userData.skills.map((skills, skillIndex) => (
                        <li key={skillIndex}>{skills}</li>
                      ))
                    ) : (
                      <li>No skills available</li>
                    )}
                  </ul>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor:'pointer'
                }}
                // onClick={handleClickProjectCount}
              >
                {/* Content for the right bottom right grid */}
                <h2>Project Count</h2>
                {/* <ProjectCount userId={studentId} /> */}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StudentProfile;