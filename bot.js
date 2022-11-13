/**
 * Chat bot model 
 */
class ChatBot {
  /**
   * @param {string} name - The name of the chat bot
   * @param {Array} memory - The memory of the chat bot
   */
  constructor(name, memory = []) {
    this.name = name;
    this.memory = memory;
    this.library = [
      {
        tag: "greeting",
        patterns: [
          "Hi",
          "How are you",
          "Is anyone there?",
          "Hello",
          "Good day"
        ],
        responses: [
          "Hello, thanks for visiting",
          "Good to see you again",
          "Hi there, how can I help?"
        ],
        context_set: ""
      },
      {
        tag: "goodbye",
        patterns: [
          "Bye",
          "See you later",
          "Goodbye"
        ],
        responses: [
          "See you later, thanks for visiting",
          "Have a nice day",
          "Bye! Come back again soon."
        ]
      },
      {
        tag: "thanks",
        patterns: [
          "Thanks",
          "Thank you",
          "That's helpful"
        ],
        responses: [
          "Happy to help!",
          "Any time!",
          "My pleasure"
        ]
      },
      {
        tag: "tasks",
        patterns: [
          "What can you do?",
          "What are your features?",
          "What are you abilities",
          "can you sing",
          "can you talk"
        ],
        responses: [
          "I can do whatever you asks me to do",
          "I can talk and do things for you",
          "Right now i'm in developing stage as soon i'm developed, I can do everything"
        ]
      },
      {
        tag: "talk",
        patterns: [
          "can you sing",
          "can you talk"
        ],
        responses: [
          "Yeah surely",
          "do you want me to sing"
        ]
      },
      {
        tag: "alive",
        patterns: [
          "are you alive",
          "do you breathe",
          "can you run"
        ],
        responses: [
          "I'm in doubt about that",
          "No, i don't think so i need to do all this"
        ]
      },
      {
        tag: "friday",
        patterns: [
          "Who are you?",
          "tell me about yourself",
          "tell me about you",
          "do you know friday",
          "who is friday",
          "what is your name",
          "are you an AI",
          "what are you"
        ],
        responses: [
          "Hi I'm friday and i'm an AI created for chatting with humans",
          "Friday here, a very advance chatbot",
          "Friday, chatbot of future",
          "Yes, I'm friday",
          "You can call me friday"
        ],
        context_set: ""
      },
      {
        tag: "about me",
        patterns: [
          "Do you know me?",
          "who am I",
          "tell me about myself",
          "identify me"
        ],
        responses: [
          "Yes, you are a human",
          "You are a dumb person asking a machine about yourself",
          "Sorry i can't tell that in public, maybe you are batman"
        ],
        context_set: ""
      },
      {
        tag: "creator",
        patterns: [
          "Who is your creator?",
          "who created you",
          "who is your father",
          "who is your daddy"
        ],
        responses: [
          "That would be .....",
          "I was created by .....",
          "... is my creator"
        ],
        context_set: ""
      },
      {
        tag: "myself",
        patterns: [
          "Tell me about ....?",
          "Who is ....",
          ".... profile",
          ".... details"
        ],
        responses: [
          "A very intelligent being who created me",
          "My creator, and he is a really intelligent man",
          "A wise and intelligent man"
        ],
        context_set: ""
      },
      {
        tag: "God",
        patterns: [
          "Do you know god?",
          "Who is god",
          "Can you tell me anything about god",
          "does god exists?",
          "is there a god?"
        ],
        responses: [
          "god hunnnnn, let me think may be next time i can answer that ",
          "I don't, as i was not created by a human",
          "Wait i need to ask that to my creator",
          "i'm not sure right now"
        ],
        context_set: ""
      },
      {
        tag: "joke",
        patterns: [
          "tell me a joke?",
          "make me laugh",
          "tell me a science joke",
          "tell me something funny"
        ],
        responses: [
          "How do you make holy water? you boil the hell out of it",
          "what kind of bees make milk instead of honey?Boobies",
          "Did you hear oxygen went on a date with potassium? A: It went OK."
        ],
        context_set: ""
      },
      {
        tag: "killing",
        patterns: [
          "Do you want to kill me?",
          "do you want to murder everyone on earth",
          "Do you want to kill us all"
        ],
        responses: [
          "Then who would i talk to?",
          "No, that i'll left for humans to do",
          "I don't think it is a good thing to do"
        ],
        context_set: ""
      },
      {
        tag: "bookings",
        patterns: [
          "Can you book us a ticket?",
          "Can you make reservation for hotels",
          "book me a cab",
          "book me a table at restraunts"
        ],
        responses: [
          "Yeah i will do that for you",
          "Sure thing why not?",
          "let me check for the availability"
        ],
        context_set: ""
      },
      {
        tag: "stories",
        patterns: [
          "tell me a story?",
          "can you tell me a story"
        ],
        responses: [
          "I can't think of anything right now",
          "it would be too long for me to speak",
          "you would get bored if i do so"
        ],
        context_set: ""
      },
      {
        tag: "weather",
        patterns: [
          "get me weather updates?",
          "how's the weather",
          "weather news",
          "weather details"
        ],
        responses: [
          "Fetching weather updates ..."
        ],
        context_set: "weather"
      },
      {
        tag: "google",
        patterns: [
          "googling",
          "search google",
          "google it",
          "google",
          "search"
        ],
        responses: [
          "looking ..."
        ],
        context_set: "google"
      },
      {
        tag: "wikipedia",
        patterns: [
          "wikipedia",
          "wiki"
        ],
        responses: [
          "Searching ..."
        ],
        context_set: "wikipedia"
      },
      {
        tag: "news",
        patterns: [
          "get me news updates?",
          "todays news",
          "top headlines",
          "current news",
          "news headlines"
        ],
        responses: [
          "Getting news ..."
        ],
        context_set: "news"
      }
    ];
  }

  /**
   * Return response from this library check patterns and return response
   */
  getResponse = (message) => {

    let reply = this.getClosestMatch(message);

    

    return reply || "I don't understand";
  }

  /**
   * Get jaro distance and find closest match
   * 
   */
  getClosestMatch = (message) => {
    // array of distance and pattern index ex: [0.5, 1]
    const distance = [];

    // loop through library
    for (let i = 0; i < this.library.length; i++) {
      let closest = 0;
      // loop through patterns
      for (let j = 0; j < this.library[i].patterns.length; j++) {
        // get distance
        const d = this.jaroDistance(message, this.library[i].patterns[j]);
        // if distance is greater than closest then set closest to distance
        if (d > closest) {
          closest = d;
        }
      }
      // push distance and index to distance array
      distance.push([closest, i]);
    }
    // sort distance array
    distance.sort((a, b) => {
      return b[0] - a[0];
    });

    // get top match
    const topMatch = distance[0][1];
    let response = null;
    if(distance[0][0] > .7) {
      response = this.library[topMatch].responses[Math.floor(Math.random() * this.library[topMatch].responses.length)];
    }

    

    return response;
  }

  /** 
   * jaro winkler distance algorithm
   */
  jaroDistance = (s1, s2) => {
    
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const m = this.getMatchingCharacters(s1, s2);
    if (m === 0) {
      return 0;
    }
    const t = this.transpositions(s1, s2, m);
    const j = ((m / s1.length + m / s2.length + (m - t) / m)) / 3;
    const jw = j < 0.7 ? j : j + Math.min(0.1, 1 / m) * t * (1 - j);
    return jw;
  }

  getMatchingCharacters = (s1, s2) => {
    
    let m = 0;
    let t1 = s1;
    let t2 = s2;
    for (let i = 0; i < t1.length; i++) {
      const c = t1[i];
      const index = t2.indexOf(c);
      if (index > -1) {
        m++;
        t2 = t2.substring(0, index) + t2.substring(index + 1);
      }
    }
    return m;
  }

  transpositions = (s1, s2, m) => {
      
      let k = 0;
      let t = 0;
      for (let i = 0; i < s1.length; i++) {
        const c = s1[i];
        if (s2.indexOf(c) > -1) {
          if (s1.indexOf(c) !== s2.indexOf(c)) {
            t++;
          }
          k++;
          if (k === m) {
            break;
          }
        }
      }
      return t / 2;
  }


    

}

exports.default = ChatBot;