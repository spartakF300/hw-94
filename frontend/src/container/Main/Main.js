import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPost, modalState} from "../../store/actions/actionsPost";
import MyModal from "../../components/Modal/MyModal";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {fetchSubscriptions} from "../../store/actions/usersActions";
import PostCard from "../../components/PostCard/PostCard";

const Main = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const post = useSelector(state => state.post.post);

    const [field, setField] = useState({username: ''});

    useEffect(() => {
        dispatch(getPost(user._id))

    }, [dispatch]);

    const inputChangeHandler = event => {
        setField({
            username: event.target.value
        })
    };
    const sendForm = () => {
        if (field.username){
            dispatch(fetchSubscriptions(field));
            dispatch(getPost(user._id))
        }
        dispatch(modalState());
    };
    const modal = (
            <MyModal>

                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Subscriptions</Typography>
                        </Box>

                        <form>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="username"
                                        type="text"
                                        title="User name"
                                        value={field.username}
                                        onChange={inputChangeHandler}
                                        placeholder="User name"
                                        autoComplete="new-user name"
                                        required
                                    />
                                </Grid>

                                <Grid item xs>
                                    <Button type="submit" onClick={sendForm} color="primary" variant="contained">
                                        Send
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </MyModal>

    );
    if(!post.length){
        return(
            <>
            <h1>No post</h1>
           { modal}
           </>
        )
    }
    return (

        <div>
            {modal}
            <Grid   container direction="column"  alignContent="center" spacing={1}>
            {post.map(p => {
                return <PostCard
                    key={p._id}
                    title={p.title}
                    image={p.image}
                    tags={p.tags}
                    username={p.user.username}
                    displayName={p.user.displayName}
                />
            })}
            </Grid>
        </div>
    );
};

export default Main;