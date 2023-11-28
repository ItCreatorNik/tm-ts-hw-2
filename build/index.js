"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Status;
(function (Status) {
    Status["OK"] = "OK";
    Status["ERROR"] = "ERROR";
})(Status || (Status = {}));
const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("https://jsonplaceholder.typicode.com/posts");
        const posts = yield response.json();
        return posts;
    }
    catch (error) {
        throw error;
    }
});
const renderPosts = (posts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const container = document.querySelector("#postContainer");
        if (container) {
            const list = document.createElement("ul");
            list.classList.add("post-list");
            posts.forEach((post) => {
                const listItem = document.createElement("li");
                listItem.classList.add("post-item");
                listItem.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                list.appendChild(listItem);
            });
            container.appendChild(list);
        }
    }
    catch (error) {
        console.error("Error", error);
    }
});
const updateObjectInArray = (initialValue, key, value, patch) => {
    const indexObj = initialValue.findIndex((obj) => obj[key] === value);
    if (indexObj !== -1) {
        const newArr = [...initialValue];
        newArr[indexObj] = Object.assign(Object.assign({}, newArr[indexObj]), patch);
        return newArr;
    }
    else {
        throw new Error("Object not found in array");
    }
};
const finalRenderWithUpdate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield getPosts();
        if (data.length) {
            const updatedPosts = updateObjectInArray(data, "id", 1, {
                title: "Перевірка",
                body: "Успішно оновили пост",
            });
            renderPosts(updatedPosts);
        }
    }
    catch (error) {
        console.error("Error", error);
    }
});
finalRenderWithUpdate();
