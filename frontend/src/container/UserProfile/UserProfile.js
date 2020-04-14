import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {editProfile} from "../../store/actions/usersActions";
import {apiURL} from "../../constants";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import imageNotAvailable from "../../assets/images/image_not_available.jpg";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);

  const [state, setState] = useState({
    username: user.username,
    avatar: null,
    displayName: user.displayName || '',

  });

  const onSubmit = e => {
    e.preventDefault();

    const profileData = new FormData();

    Object.keys(state).forEach(key => {
      profileData.append(key, state[key]);
    });

    dispatch(editProfile(profileData));
  };

  const onChange = e => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const onFileChange = e => {
    setState({...state, [e.target.name]: e.target.files[0]});
  };
  let image = imageNotAvailable;

  if (user.avatar) {
    image = apiURL + '/' + user.avatar;
  }
  return (
    <>

      <Box pt={2} pb={2} pl={10}>
        <Typography variant="h4">User name:{user.username}</Typography>
        <Typography variant="h4">Display name:{user.displayName || "no name"}</Typography>
        <Box>
          <img src={image} alt={user.username} style={{maxWidth: '100px'}}/>
        </Box>
      </Box>
      <Grid container justify="center">
          <Grid item xs={12} md={10} lg={4}>
            <Box pt={2} pb={2}>
              <Typography variant="h4">Change user profile</Typography>
            </Box>

            <form onSubmit={onSubmit}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs>
                  <FormElement
                      propertyName="username"
                      title="User name"
                      value={state.username}
                      onChange={onChange}
                      placeholder="Enter username"
                      autoComplete="new-username"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                      propertyName="displayName"
                      title="Display name"
                      type="text"
                      value={state.displayName}
                      onChange={onChange}
                      placeholder="Enter Display name"
                      autoComplete="Display name"
                  />
                </Grid>
                <Grid item xs>
                  <FormElement
                      propertyName="avatar"
                      title="Avatar"
                      type="file"
                      onChange={onFileChange}
                  />
                </Grid>

                <Grid item xs>
                  <Button type="submit" color="primary" variant="contained">
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </>
  );
};

export default UserProfile;