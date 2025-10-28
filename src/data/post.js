 export const forumData = {
  users: [
    { id: "u101", username: "kopifan88", avatar: "👤" },
    { id: "u102", username: "barista_joe", avatar: "☕" },
    { id: "u103", username: "technerd", avatar: "💻" },
    { id: "u104", username: "latte_lady", avatar: "👩‍🍳" },
    { id: "u105", username: "admin_mocha", avatar: "🛠️" },
  ],

  communities: [
    {
      id: "c201",
      name: "Coffee Lovers",
      description: "Talk beans, brews, and barista tips!",
    },
    {
      id: "c202",
      name: "Tech Talk",
      description: "Coding, gadgets, AI, and software rants.",
    },
    {
      id: "c203",
      name: "Books & Brews",
      description: "Books to sip coffee with ☕📚",
    },
    {
      id: "c204",
      name: "Off Topic",
      description: "Random thoughts, memes, and general fun.",
    },
  ],

  posts: [
    {
      id: "p301",
      title: "Best espresso machines under $500?",
      content: "Looking for a solid entry-level espresso machine. Any tips?",
      authorId: "u102",
      communityId: "c201",
      createdAt: "2025-10-19T08:30:00Z",
      votes: [
        { userId: "u101", type: "up" },
        { userId: "u103", type: "down" },
      ],
    },
    {
      id: "p302",
      title: "Cold brew recipe?",
      content:
        "Trying to make smooth cold brew at home. Share yours! Trying to make smooth cold brew at home. Share yours! Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!Trying to make smooth cold brew at home. Share yours!",
      authorId: "u101",
      communityId: "c201",
      createdAt: "2025-10-20T11:00:00Z",
      votes: [
        { userId: "u102", type: "up" },
        { userId: "u103", type: "up" },
      ],
    },
    {
      id: "p303",
      title: "SvelteKit vs Next.js?",
      content:
        "Anyone switched to SvelteKit recently? Anyone switched to SvelteKit recently? Anyone switched to SvelteKit recently? Anyone switched to SvelteKit recently? Anyone switched to SvelteKit recently? Anyone switched to SvelteKit recently? Anyone switched to SvelteKit recently?",
      authorId: "u103",
      communityId: "c202",
      createdAt: "2025-10-18T14:45:00Z",
      votes: [{ userId: "u105", type: "up" }],
    },
    {
      id: "p304",
      title: "How do you stay productive?",
      content:
        "I’m constantly distracted while coding. Tips? I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips?I’m constantly distracted while coding. Tips? ",
      authorId: "u105",
      communityId: "c202",
      createdAt: "2025-10-17T10:20:00Z",
      votes: [{ userId: "u102", type: "down" }],
    },
    {
      id: "p305",
      title: "Independent Post Example",
      content: "This post is not in any community, just its own page.",
      authorId: "u101",
      communityId: null,
      createdAt: "2025-10-22T12:00:00Z",
      votes: [],
    },
  ],

  comments: [
    {
      id: "cm401",
      postId: "p301",
      authorId: "u101",
      content: "Breville Bambino Plus is great!",
      createdAt: "2025-10-19T09:00:00Z",
      parentId: null,
      votes: [{ userId: "u102", type: "up" }],
    }, //level 0
    {
      id: "cm402",
      postId: "p301",
      authorId: "u104",
      content: "Check out Gaggia Classic Pro 👌",
      createdAt: "2025-10-19T09:15:00Z",
      parentId: null,
      votes: [],
    },
    {
      id: "cm403",
      postId: "p301",
      authorId: "u102",
      content: "Second this! I own it too.",
      createdAt: "2025-10-19T09:30:00Z",
      parentId: "cm401",
      votes: [{ userId: "u101", type: "up" }],
    }, //level1
    {
      id: "cm404",
      postId: "p301",
      authorId: "u103",
      content: "Is it good for beginners?",
      createdAt: "2025-10-19T09:45:00Z",
      parentId: "cm403",
      votes: [], //level 2
    },
    {
      id: "cm405",
      postId: "p301",
      authorId: "u105",
      content: "Also consider DeLonghi Dedica — reliable and compact.",
      createdAt: "2025-10-19T10:10:00Z",
      parentId: null,
      votes: [{ userId: "u101", type: "down" }],
    },
    {
      id: "cm406",
      postId: "p301",
      authorId: "u101",
      content:
        "That one’s solid too. But you’ll want to upgrade the steam wand!",
      createdAt: "2025-10-19T10:25:00Z",
      parentId: "cm405",
      votes: [],
    },

    {
      id: "cm407",
      postId: "p302",
      authorId: "u102",
      content: "Use coarse ground beans and steep for 16–18 hours.",
      createdAt: "2025-10-20T11:30:00Z",
      parentId: null,
      votes: [{ userId: "u103", type: "up" }],
    },
    {
      id: "cm408",
      postId: "p302",
      authorId: "u103",
      content: "Add a pinch of salt, it cuts bitterness. Works wonders.",
      createdAt: "2025-10-20T12:00:00Z",
      parentId: null,
      votes: [],
    },
    {
      id: "cm409",
      postId: "p302",
      authorId: "u101",
      content: "Interesting! Never tried salt before 😮",
      createdAt: "2025-10-20T12:15:00Z",
      parentId: "cm408",
      votes: [],
    },

    {
      id: "cm410",
      postId: "p303",
      authorId: "u102",
      content: "SvelteKit is smooth but lacks some ecosystem tools.",
      createdAt: "2025-10-18T15:00:00Z",
      parentId: null,
      votes: [{ userId: "u105", type: "up" }],
    },
    {
      id: "cm411",
      postId: "p303",
      authorId: "u105",
      content: "Next.js still feels more production-ready IMO.",
      createdAt: "2025-10-18T15:10:00Z",
      parentId: null,
      votes: [],
    },
    {
      id: "cm412",
      postId: "p303",
      authorId: "u103",
      content: "True, but SvelteKit’s DX is so clean. Routing is a dream.",
      createdAt: "2025-10-18T15:20:00Z",
      parentId: "cm411",
      votes: [],
    },

    {
      id: "cm413",
      postId: "p304",
      authorId: "u104",
      content: "Pomodoro method helps me stay focused.",
      createdAt: "2025-10-17T11:00:00Z",
      parentId: null,
      votes: [],
    },
    {
      id: "cm414",
      postId: "p304",
      authorId: "u101",
      content: "Noise-canceling headphones + lo-fi!",
      createdAt: "2025-10-17T11:30:00Z",
      parentId: null,
      votes: [{ userId: "u104", type: "up" }],
    },
    {
      id: "cm415",
      postId: "p304",
      authorId: "u102",
      content: "I combine both Pomodoro and '2-minute rule' for tasks.",
      createdAt: "2025-10-17T11:45:00Z",
      parentId: "cm413",
      votes: [],
    },

    {
      id: "cm416",
      postId: "p305",
      authorId: "u103",
      content: "Nice independent post!",
      createdAt: "2025-10-22T12:30:00Z",
      parentId: null,
      votes: [],
    },
    {
      id: "cm417",
      postId: "p305",
      authorId: "u105",
      content: "Standalone posts should have their own vibe 😎",
      createdAt: "2025-10-22T13:00:00Z",
      parentId: null,
      votes: [],
    },
  ],
};

export default forumData;
