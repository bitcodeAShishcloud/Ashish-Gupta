# Portfolio - Ashish Gupta

A modern, interactive portfolio website featuring an intelligent chatbot with score-based answer matching and dynamic responses.

## 🌟 Features

### Smart Chatbot

- **Score-Based Matching**: Breaks user queries into keywords and ranks answers by relevance
- **Dynamic Responses**: Multiple answer variations reduce repetition and feel more natural
- **Intelligent Fallbacks**: Contextual default responses guide users when queries don't match

### Interactive UI

- **Quick Links**: Instantly navigate to different sections (About, Education, Projects, Skills, Contact, Location)
- **Suggestion Chips**: One-click prompts for common questions
- **Responsive Design**: Beautiful layout with animated gradients and smooth interactions
- **Chat Interface**: Clean, modern messaging experience with typing indicators

### Content Sections

- **About**: Personal background and focus areas
- **Education**: Academic journey at NIET
- **Projects**: Security labs and tools built
- **Skills**: Technical expertise and tools
- **Contact**: Direct email link and LinkedIn profile for collaboration
- **Location**: Geographic information and availability

## 📋 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Architecture**: Modular design with separated data and logic
- **Styling**: Custom CSS with gradient effects and animations
- **Data Structure**: JSON-based Q&A system for easy maintenance

## 📁 Project Structure

```
sidha/
├── index.html       # Main HTML structure
├── style.css        # Styling and animations
├── script.js        # Interactive logic and chatbot functionality
├── data.js          # Profile data and Q&A database
├── assets/          # Images and media files
│   └── Ashish.jpeg
└── README.md        # This file
```

## 🚀 Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd sidha
```

2. Open in your browser:

```bash
# Simply open index.html in your web browser
# Or use a local server (recommended)
```

### Using a Local Server

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (with http-server)
npx http-server
```

Then visit `http://localhost:8000` in your browser.

## 💬 Chatbot System

### How It Works

1. **Keyword Extraction**: User input is split into individual words
2. **Score Calculation**: Each Q&A entry is scored based on keyword matches
3. **Best Match Selection**: The entry with the highest score is selected
4. **Dynamic Response**: A random variation from multiple answers is returned

### Example Queries

| Query                                | Matched Category   | Response                       |
| ------------------------------------ | ------------------ | ------------------------------ |
| "Tell me about yourself"             | About/Who          | Personality and background     |
| "What do you know about Python?"     | Programming/Python | Python skill details           |
| "How can I contact you?"             | Contact            | Email and collaboration info   |
| "Which projects have you worked on?" | Projects           | Portfolio of security projects |

### Adding New Q&A Entries

Edit `data.js` and add to the `qa` array:

```javascript
{
  keywords: ["your", "keywords", "here"],
  answers: [
    "First variation of your answer",
    "Second variation of your answer",
    "Third variation of your answer"
  ]
}
```

Each category should have 3-4 answer variations for natural conversation flow.

## 🎨 Customization

### Update Profile Information

Edit `data.js`:

- Change `name`, `roleLine`, `greeting`
- Update profile `image.src`
- Modify card content in `cards` object
- Add/edit suggestion chips in `suggestions` array

### Styling

Modify `style.css` to customize:

- Color schemes and gradients
- Animations and transitions
- Layout and spacing
- Font families and sizes

### Add More Sections

1. Add to `sections` array in `data.js`
2. Create corresponding `detail-card` in `index.html`
3. Add Q&A entries for the new topic

## 📊 Performance Optimizations

- Minimal dependencies (vanilla JavaScript)
- Efficient DOM manipulation
- Optimized animations using CSS transforms
- Lazy loading for chat messages

## 🔒 Security

- No sensitive data in frontend code
- Email links use `mailto:` protocol
- Input sanitization for chat messages
- HTML entity encoding for user-generated content

## 📱 Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

### Tips for Customization

1. Preserve the modular structure
2. Keep data in `data.js` separate from logic
3. Test chatbot with various queries after adding Q&A entries
4. Test responsive design on multiple devices

## 📄 License

This project is open source and available under the MIT License.

## 📧 Contact

For questions about the portfolio or the code:

- Email: [agupta38160@gmail.com](mailto:agupta38160@gmail.com)
- LinkedIn: [Ashish Gupta](https://www.linkedin.com/in/ashish-gupta-037973259/)
- GitHub: [bitcodeAShishcloud](https://github.com/bitcodeAShishcloud)
- WhatsApp: [Whatsapp](https://wa.me/918303511792)
- Portfolio: Check the live website

## 🎯 Future Enhancements

- [ ] Multi-language support
- [ ] Dark/Light theme toggle
- [ ] Advanced NLP for better matching
- [ ] Additional social media integration (GitHub, Twitter)
- [ ] Analytics tracking
- [ ] Blog/Articles section
- [ ] Project showcase with image galleries

---

**Made with ❤️ by Ashish Gupta**
