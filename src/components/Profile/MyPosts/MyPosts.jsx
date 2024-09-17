import React, { useRef } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addPostFormSchema } from '../../FormValidation/AddPostFormSchema';

const MyPosts = React.memo(props => {
  
    let postsElements = props.postsData.map((p) => <Post message={p.message} likesCount={p.likesCount} />);

    let newPostElement = React.createRef(null);

    function onPostChange()
    {
      props.updateNewPostText(newPostElement.current.value);
    }

    function addPost(newPostText)
    {
      props.addPost(newPostText);
    }

    return (
      <div className={s.postsBlock}>
        <h3>My posts</h3>
        <div>
          <Formik initialValues={{newPostText: ""}} onSubmit={(values, {resetForm}) => 
              {
                  addPost(values.newPostText);
                  resetForm({values: {newPostText: ""}});
              }
            } validationSchema={addPostFormSchema} >
            {
              () => (
                <Form>
                  <div>
                    <Field type={"text"} name={"newPostText"} />
                  </div>
                  <ErrorMessage name='newPostText' component="div" />
                  <div>
                    <button type='submit'>Add post</button>
                  </div>
                </Form>
              )
            }
          </Formik>

        </div>
        <div className={s.posts}>
          {postsElements}
        </div>
      </div>
    )
})

export default MyPosts;