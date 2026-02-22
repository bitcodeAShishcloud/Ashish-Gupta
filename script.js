const icons = {
  smile: "😊",
  "book-open": "✨",
  briefcase: "🧰",
  layers: "📚",
  user: "👤",
  "map-pin": "📍"
};

// Menu Management
const menuToggle = document.getElementById("menu-toggle");
const menuSidebar = document.getElementById("menu-sidebar");
const menuOverlay = document.getElementById("menu-overlay");
const menuClose = document.getElementById("menu-close");
const fontSizeSlider = document.getElementById("font-size-slider");
const fontSizeDisplay = document.getElementById("font-size-display");
const fontDecrease = document.getElementById("font-decrease");
const fontIncrease = document.getElementById("font-increase");

// Menu Toggle Functions
function openMenu() {
  menuSidebar.classList.add("active");
  menuOverlay.classList.add("active");
  menuToggle.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menuSidebar.classList.remove("active");
  menuOverlay.classList.remove("active");
  menuToggle.classList.remove("active");
  document.body.style.overflow = "";
}

function toggleMenu() {
  if (menuSidebar.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
}

// Menu Event Listeners
menuToggle.addEventListener("click", toggleMenu);
menuClose.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

// Close menu when a link is clicked
document.querySelectorAll(".showcase-link").forEach(link => {
  link.addEventListener("click", closeMenu);
});

// Font Size Controller
function updateFontSize() {
  const size = fontSizeSlider.value;
  fontSizeDisplay.textContent = size + "px";
  document.documentElement.style.fontSize = size + "px";
  localStorage.setItem("fontSize", size);
}

fontSizeSlider.addEventListener("input", updateFontSize);

fontDecrease.addEventListener("click", () => {
  let currentSize = parseInt(fontSizeSlider.value);
  if (currentSize > 12) {
    fontSizeSlider.value = currentSize - 1;
    updateFontSize();
  }
});

fontIncrease.addEventListener("click", () => {
  let currentSize = parseInt(fontSizeSlider.value);
  if (currentSize < 24) {
    fontSizeSlider.value = currentSize + 1;
    updateFontSize();
  }
});

// Load saved font size on page load
function loadSavedFontSize() {
  const savedSize = localStorage.getItem("fontSize");
  if (savedSize) {
    fontSizeSlider.value = savedSize;
    updateFontSize();
  }
}

// Close menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeMenu();
  }
});

loadSavedFontSize();

const greeting = document.getElementById("greeting");
const headline = document.getElementById("headline");
const role = document.getElementById("role");
const promptInput = document.getElementById("prompt-input");
const quickLinks = document.getElementById("quick-links");
const profileImage = document.getElementById("profile-image");
const promptBtn = document.querySelector(".prompt-btn");
const chatContainer = document.getElementById("chat-container");
const suggestionChips = document.getElementById("suggestion-chips");
let chatStarted = false;

function getSvgIcon(iconType) {
  const icons = {
    user: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polygon points="12 2 2 7 2 17 12 22 22 17 22 7 12 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="2 7 12 12 22 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="2 17 12 12 22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m22 6-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  return icons[iconType] || icons.user;
}

function renderQuickLinks() {
  quickLinks.innerHTML = profileData.sections
    .map((section) => {
      const icon = icons[section.icon] || "✨";
      return `
        <a class="quick-link" href="${section.href}" data-target="${section.href.substring(1)}">
          <span>${icon} ${section.label}</span>
          <span>→</span>
        </a>
      `;
    })
    .join("");
  
  // Add click handlers
  document.querySelectorAll('.quick-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.dataset.target;
      const targetCard = document.getElementById(targetId);
      
      if (targetCard) {
        const isAlreadyVisible = targetCard.classList.contains('visible');
        
        // Hide all other cards with animation
        document.querySelectorAll('.detail-card').forEach(card => {
          if (card !== targetCard && card.classList.contains('visible')) {
            card.classList.add('closing');
            setTimeout(() => {
              card.classList.remove('visible', 'closing');
            }, 400);
          }
        });
        
        // Toggle the target card
        if (!isAlreadyVisible) {
          targetCard.classList.add('visible');
          // Auto-scroll to the card after animation starts
          setTimeout(() => {
            targetCard.scrollIntoView({
              behavior: 'smooth',
              block: 'center'
            });
          }, 100);
        } else {
          targetCard.classList.add('closing');
          setTimeout(() => {
            targetCard.classList.remove('visible', 'closing');
          }, 400);
        }
      }
    });
  });
}

function renderCards() {
  Object.entries(profileData.cards).forEach(([key, card]) => {
    const target = document.getElementById(key);
    if (!target) return;
    target.innerHTML = `
      <h2>${card.title}</h2>
      <p>${card.text}</p>
    `;
  });
}

function init() {
  greeting.textContent = profileData.greeting;
  headline.textContent = profileData.name;
  role.textContent = profileData.roleLine;
  promptInput.placeholder = profileData.promptPlaceholder;

  profileImage.src = profileData.image.src;
  profileImage.alt = profileData.image.alt;

  renderQuickLinks();
  renderCards();
  setupChat();
}

function renderSuggestionChips() {
  suggestionChips.innerHTML = profileData.suggestions
    .map((chip) => {
      const svg = getSvgIcon(chip.iconType);
      return `
        <button class="chip" data-prompt="${chip.prompt}" title="${chip.label}">
          ${svg}
          <span>${chip.label}</span>
        </button>
      `;
    })
    .join("");
  
  // Add click handlers
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.dataset.prompt;
      handleChipClick(prompt);
    });
  });
}

function setupChat() {
  // Send message on button click
  promptBtn.addEventListener('click', handleSendMessage);
  
  // Send message on Enter key
  promptInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  });
}

function handleSendMessage() {
  let message = promptInput.value.trim();
  if (!message) return;
  
  // Sanitize user input
  message = sanitizeInput(message);
  
  // First message - setup chat UI
  if (!chatStarted) {
    chatContainer.classList.add('active');
    quickLinks.classList.add('hidden');
    document.querySelector('.detail-grid').classList.add('hidden');
    chatStarted = true;
    
    // Show suggestion chips immediately
    renderSuggestionChips();
    suggestionChips.classList.add('active');
  }
  
  // Add user message with sanitized input
  addMessage(message, 'user');
  
  // Clear input
  promptInput.value = '';
  
  // Show typing indicator
  showTypingIndicator();
  
  // Get bot response
  setTimeout(() => {
    removeTypingIndicator();
    const response = getBotResponse(message);
    addMessage(response, 'bot', true); // true indicates typing animation
  }, 1000);
}

function handleChipClick(prompt) {
  // Send the chip's prompt as a message
  promptInput.value = prompt;
  handleSendMessage();
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

function sanitizeInput(input) {
  // Remove leading/trailing whitespace
  let text = input.trim();
  
  // Remove any script tags or potentially dangerous content
  text = text.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/on\w+\s*=/gi, ''); // Remove event handlers
  text = text.replace(/javascript:/gi, ''); // Remove javascript: protocol
  
  // Limit length to prevent abuse
  const MAX_LENGTH = 500;
  if (text.length > MAX_LENGTH) {
    text = text.substring(0, MAX_LENGTH) + '...';
  }
  
  return text;
}

function isSafeHtml(html) {
  // For bot responses from data.js, allow safe HTML tags
  // Check for dangerous content - if none found, it's safe
  const isDangerous = /<script/i.test(html) || 
                      /on\w+\s*=/i.test(html) || 
                      /javascript:/i.test(html) ||
                      /<iframe/i.test(html) ||
                      /<embed/i.test(html) ||
                      /<object/i.test(html);
  
  // Safe if: no dangerous content AND (has allowed tags OR no tags at all)
  const hasAllowedTags = /<a\s+href=['"]?(https?:\/\/|mailto:)[^'">\s]+['"]?[^>]*>/i.test(html) ||
                         /<br\s*\/?>/i.test(html) ||
                         /target=['"]?_blank['"]?/i.test(html);
  
  return !isDangerous && (hasAllowedTags || !/[<>]/.test(html));
}

function addMessage(text, sender, useTypingAnimation = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  
  // For bot messages with typing animation
  if (sender === 'bot' && useTypingAnimation) {
    const para = document.createElement('p');
    messageDiv.appendChild(para);
    chatContainer.appendChild(messageDiv);
    
    // Scroll to message
    setTimeout(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50);
    
    // Start typing animation
    typeMessage(para, text);
    return;
  }
  
  // For bot messages with potential HTML links (no animation)
  if (sender === 'bot' && isSafeHtml(text)) {
    messageDiv.innerHTML = `<p>${text}</p>`;
  } else {
    // For user messages and unsafe content, use textContent to prevent XSS
    let para = document.createElement('p');
    para.textContent = text;
    messageDiv.appendChild(para);
  }
  
  chatContainer.appendChild(messageDiv);
  
  // Auto-scroll to bottom with a small delay to ensure DOM is updated
  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 100);
}

function typeMessage(element, text) {
  // Check if text contains HTML
  const hasHtml = isSafeHtml(text) && /<[^>]+>/.test(text);
  
  let tokens = [];
  
  if (hasHtml) {
    // For HTML content, split while preserving tags
    // Match words and HTML tags as separate tokens
    const regex = /(<[^>]+>|[^\s<]+|\s+)/g;
    let match;
    let buffer = '';
    
    while ((match = regex.exec(text)) !== null) {
      const token = match[0];
      
      if (/<[^>]+>/.test(token)) {
        // It's an HTML tag
        buffer += token;
      } else if (/\s+/.test(token)) {
        // It's whitespace
        if (buffer) {
          tokens.push(buffer + token);
          buffer = '';
        } else if (tokens.length > 0) {
          tokens[tokens.length - 1] += token;
        }
      } else {
        // It's a word
        tokens.push(buffer + token);
        buffer = '';
      }
    }
    
    // Add any remaining buffer
    if (buffer) {
      if (tokens.length > 0) {
        tokens[tokens.length - 1] += buffer;
      } else {
        tokens.push(buffer);
      }
    }
  } else {
    // For plain text, split by words
    const words = text.split(/(\s+)/);
    words.forEach(word => {
      if (word.trim()) {
        tokens.push(word);
      } else if (word && tokens.length > 0) {
        tokens[tokens.length - 1] += word;
      }
    });
  }
  
  let currentIndex = 0;
  let displayedText = '';
  
  function typeNextToken() {
    if (currentIndex < tokens.length) {
      const token = tokens[currentIndex];
      displayedText += token;
      
      // Update element content
      if (hasHtml) {
        element.innerHTML = displayedText;
      } else {
        element.textContent = displayedText;
      }
      
      currentIndex++;
      
      // Auto-scroll as we type
      chatContainer.scrollTop = chatContainer.scrollHeight;
      
      // Calculate delay based on token length (faster for small tokens)
      const baseDelay = 40;
      const tokenLength = token.replace(/<[^>]+>/g, '').trim().length;
      const delay = tokenLength > 0 ? baseDelay + Math.min(tokenLength * 8, 100) : baseDelay;
      
      setTimeout(typeNextToken, delay);
    }
  }
  
  // Start typing
  typeNextToken();
}

function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message bot typing-indicator';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  chatContainer.appendChild(typingDiv);
  
  // Auto-scroll to typing indicator
  setTimeout(() => {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 100);
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

function getRandomAnswer(answers) {
  return answers[Math.floor(Math.random() * answers.length)];
}

function getBotResponse(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  
  // Break user message into words
  const userWords = lowerMessage.split(/\s+/).filter(word => word.length > 0);
  
  // Score-based matching: evaluate all answers
  let bestMatch = null;
  let highestScore = 0;
  
  for (const qa of profileData.qa) {
    let score = 0;
    
    // Count keyword matches
    for (const keyword of qa.keywords) {
      for (const word of userWords) {
        // Exact word match or substring match
        if (word === keyword.toLowerCase() || keyword.toLowerCase().includes(word)) {
          score += 1;
        }
      }
    }
    
    // Update best match if this answer has a higher score
    if (score > highestScore) {
      highestScore = score;
      bestMatch = qa;
    }
  }
  
  // Return a random variation of the best answer, or default if no match found
  if (bestMatch && highestScore > 0) {
    return getRandomAnswer(bestMatch.answers);
  }
  
  // Default responses with variation
  const defaultResponses = [
    "That's an interesting question! Try clicking one of the suggestion chips above to learn more about me, or ask about my education, projects, skills, or location.",
    "I'm not sure about that, but feel free to ask me about my work, skills, education, or anything related to cyber security!",
    "That's a good question! Check the suggestion chips or ask me something about my background and expertise.",
    "Hmm, interesting! You might want to explore the quick links or ask about my projects and skills."
  ];
  
  return getRandomAnswer(defaultResponses);
}

init();
