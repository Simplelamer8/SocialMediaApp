import profileReducer, { addPostActionCreator, deletePost } from "./profileReducer";

let state = {
    postsData: [
        {id:1, message:"Hi, how are you?", likesCount:12},
        {id:2, message:"It's my first post", likesCount:21},
    ],
}

it("The number of posts should increase", () => {
    // 1. Initial data
    let action = addPostActionCreator("IT-Kamasutra");

    // 2. Action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.postsData.length).toBe(3);
});

it("The new message test", () => {
    // 1. Initial data
    let action = addPostActionCreator("IT-Kamasutra");
    
    // 2. Action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.postsData[2].message).toBe("IT-Kamasutra");
});

it("The length of posts should NOT decrease if the passed id does not exist (deletion)", () => {
    // 1. Initial data
    let action = deletePost(10);
    
    // 2. Action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.postsData.length).toBe(2);
});

it("The length of posts should decrease if the passed id DOES exist (deletion)", () => {
    // 1. Initial data
    let action = deletePost(1);
    
    // 2. Action
    let newState = profileReducer(state, action);

    // 3. Expectation
    expect(newState.postsData.length).toBe(1);
});
