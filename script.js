// Initialize Showdown library
const converter = new showdown.Converter();

// Get the base URL of the Markdown files on GitHub
const baseURL = 'https://raw.githubusercontent.com/OhRetro/TWW-NEO-RPG/main/'; // Replace with the base URL of your Markdown files

// Function to handle hyperlink clicks
function handleLinkClick(event) {
    event.preventDefault(); // Prevent the default link behavior
  
    const link = event.target.getAttribute('href');
    navigateTo(link); // Navigate to the clicked hyperlink
  }
  
  // Function to load and display the Markdown content based on the URL hash fragment
  function navigateTo(path) {
    const markdownFile = baseURL + path;
  
    fetch(markdownFile)
      .then(response => response.text())
      .then(text => {
        // Convert Markdown to HTML
        const html = converter.makeHtml(text);
  
        // Display the HTML content in the div
        const rulebookDiv = document.getElementById('rulebook');
        rulebookDiv.innerHTML = html;
  
        // Update the URL hash fragment
        window.location.hash = path;
  
        // Add event listeners to internal hyperlinks in the newly loaded content
        const links = rulebookDiv.getElementsByTagName('a');
        for (let i = 0; i < links.length; i++) {
          const link = links[i];
          const href = link.getAttribute('href');
          if (href && href.endsWith('.md')) {
            link.addEventListener('click', handleLinkClick);
          }
        }
      })
      .catch(error => {
        console.error('Error loading Markdown file:', error);
      });
  }
  
  // Function to extract the path from the URL hash fragment
  function getPathFromHash() {
    return window.location.hash.slice(1); // Remove the leading '#'
  }
  
  // Add a 'hashchange' event listener to handle navigation when the URL hash fragment changes
  window.addEventListener('hashchange', () => {
    const path = getPathFromHash();
    navigateTo(path);
  });
  
  // Initial load based on the URL hash fragment
  const initialPath = getPathFromHash();
  navigateTo(initialPath || './RPG.md'); // Replace with the path to your default Markdown file