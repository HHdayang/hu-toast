import Vue from 'vue';
import CommentsRootContainer from './CommentsOverlay.vue';

const optionsDefaults = {
  // Retrieves the current logged in user that is posting a comment
  commenterSelector() {
    return {
      id: null,
      fullName: 'Anonymous',
      initials: '--',
      email: null,
    };
  },
  data: {
    // Hash object of all elements that can be commented on
    targets: {},
    onCreate(created) {
      this.targets[created.targetId].comments.push(created);
    },
    onEdit(editted) {
      // This is obviously not necessary
      // It's there to illustrate what could be done in the callback of a remote call
      const { comments } = this.targets[editted.targetId];
      comments.splice(comments.indexOf(editted), 1, editted);
    },
    onRemove(removed) {
      const { comments } = this.targets[removed.targetId];
      comments.splice(comments.indexOf(removed), 1);
    },
  },
};


export default {
  // eslint-disable-next-line no-unused-vars
  install(vue, opts) {
    const options = { ...optionsDefaults, ...opts };

    console.log('options=', options);
    console.log('Installing the CommentsOverlay plugin!');
    // Fun will happen here

    // eslint-disable-next-line no-undef
    const root = new Vue({
      data: { targets: options.data.targets },
      // eslint-disable-next-line no-undef
      render: createElement => createElement(CommentsRootContainer),

    });
    root.$mount(document.body.appendChild(document.createElement('div')));

    // Register data mutation handlers on root instance
    root.$on('create', options.data.onCreate);
    root.$on('edit', options.data.onEdit);
    root.$on('remove', options.data.onRemove);

    // Make the root instance available in all components
    // eslint-disable-next-line no-param-reassign
    vue.prototype.$commentsOverlay = root;
    console.log(root);
  },
};
