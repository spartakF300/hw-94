import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {fetchPost, fetchTags} from "../../store/actions/actionsPost";

const NewPost = (props) => {
    const dispatch = useDispatch();
    const tags = useSelector(state=> state.post.tags);
    const [field, setField] = useState({
        title: '',
        image: null,
        tags: '[]'
    });
    useEffect(()=>{
        dispatch(fetchTags())
    },[dispatch])
    const inputChangeHandler = event => {
        setField({
            ...field,
            [event.target.name]: event.target.value
        })
    };
    const submitFormHandler = event => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(field).forEach(key => {
            formData.append(key, field[key])
        });
        dispatch(fetchPost(formData))
    };

    const fileChangeHandler = (e) => {
        setField({...field, [e.target.name]: e.target.files[0]})
    };

    const tagsChangeHandler = (e, tags) => {
        setField({...field, tags: JSON.stringify(tags)})
    };
    return (
        <>
            <Grid container justify="center">
                <Grid item xs={12} md={10} lg={4}>
                    <Box pt={2} pb={2}>
                        <Typography variant="h4">Add post</Typography>
                    </Box>

                    <form onSubmit={submitFormHandler}>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <FormElement
                                    propertyName="title"
                                    type="text"
                                    title="Title"
                                    value={field.title}
                                    onChange={inputChangeHandler}
                                    placeholder="Title"
                                    autoComplete="new-title"
                                />
                            </Grid>

                            <Grid item xs>
                                <FormElement
                                    propertyName="image"
                                    title="Image"
                                    type="file"
                                    onChange={fileChangeHandler}
                                />
                            </Grid>
                            <Grid item xs>
                                <FormElement
                                    propertyName="tags"
                                    title="Tags"
                                    onChange={tagsChangeHandler}
                                    type="tags"
                                    tags={tags}
                                    value={JSON.parse(field.tags)}
                                />
                            </Grid>
                            <Grid item xs>
                                <Button type="submit" color="primary" variant="contained">
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

export default NewPost;