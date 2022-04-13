const styleRules = `#main-content-div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  overflow-y: hidden;
}

#messages-content-div {
  overflow-y: scroll;
  scroll-behavior: smooth;
}

#messages {
  height: calc(100vh - 64px);
}

#users {
  height: 100%;
  display: block;
}

form {
  display: block;
}

#userList {
  margin-left: 40px;
}`;

(async function () {
  // don't run if we've already injected styles and replaced the layout
  if (document.body.dataset.styleFixed === 'true') return;
  // inject and rearrange elements to make layout less bad
  const style = document.createElement('style');
  style.innerHTML = styleRules;
  document.head.appendChild(style);

  const mainContentDiv = document.createElement('div');
  mainContentDiv.id = 'main-content-div';
  document.body.prepend(mainContentDiv);
  const messagesContentDiv = document.createElement('div');
  messagesContentDiv.id = 'messages-content-div';
  mainContentDiv.appendChild(messagesContentDiv);
  const messages = document.querySelector('#messages');
  messagesContentDiv.appendChild(messages);
  const users = document.querySelector('#users');
  mainContentDiv.appendChild(users);

  // listen for messages and auto scroll to newest message
  socket.on('msg', () => {
    setTimeout(() => {
      messagesContentDiv.scrollTo(0, messagesContentDiv.scrollHeight);
    }, 10);
  });
  document.body.dataset.styleFixed = 'true';
})();
