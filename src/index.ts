interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();
    return posts;
  } catch (error) {
    throw error;
  }
};

const renderPosts = async (posts: Post[]): Promise<void> => {
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
  } catch (error) {
    console.error("Error", error);
  }
};

const updateObjectInArray = <T extends Post>(
  initialValue: T[],
  key: keyof T,
  value: T[keyof T],
  patch: Partial<T>
): T[] => {
  const indexObj = initialValue.findIndex((obj) => obj[key] === value);

  if (indexObj !== -1) {
    const newArr: T[] = [...initialValue];
    newArr[indexObj] = { ...newArr[indexObj], ...patch };
    return newArr;
  } else {
    throw new Error("Object not found in array");
  }
};

const finalRenderWithUpdate = async () => {
  try {
    const data = await getPosts();
    if (data.length) {
      const updatedPosts = updateObjectInArray<Post>(data, "id", 1, {
        title: "Перевірка",
        body: "Успішно оновили пост",
      });
      renderPosts(updatedPosts);
    }
  } catch (error) {
    console.error("Error", error);
  }
};

finalRenderWithUpdate();
