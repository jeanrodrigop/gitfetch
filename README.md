
-----

# [WIP] GitFetch: Neofetch-Style GitHub Stats Card

A dynamic, serverless function that generates a Neofetch-style stats card for your GitHub profile. Display your stats in a visually appealing terminal-like image, perfect for your `README.md`.

## Features

  - **Dynamic Stats**: Automatically fetches your latest GitHub stats.
  - **Neofetch Look**: Renders stats and your avatar as ASCII art inside a terminal-style SVG image.
  - **Customizable**: Offers different themes and allows for custom images.
  - **Serverless**: Deployed on Vercel for high availability and performance.

## Project Structure

The project is organized as follows:

```
gitfetch/
├── api/
│   └── index.js             # Main API Handler
├── utils/
│   ├── github.js            # Fetches data from GitHub
│   ├── imageToAscii.js      # Converts images to ASCII
│   └── renderer.js          # Renders the final SVG with ASCII and stats
├── package.json             # Project dependencies and scripts
└── vercel.json              # Vercel deployment configuration
```

## Deployment & Usage

You can deploy your own instance of GitFetch or use the public one.

### Using It in Your README

To add the GitFetch card to your `README.md`, simply copy the following Markdown code and replace `your-github-user` with your GitHub username.

```markdown
![GitFetch](https://gitfetch-card.vercel.app/api?username=your-github-user)
```

#### Customization Options

You can customize the card's appearance with URL parameters:

  - **Themes**: Use the `theme` parameter to change the look.

    ```markdown
    ![GitFetch](https://gitfetch-stats.vercel.app/api?username=your-github-user&theme=light)
    ```

  - **Custom Image**: Use `image_url` to replace your avatar with a custom image.

    ```markdown
    ![GitFetch](https://gitfetch-stats.vercel.app/api?username=your-github-user&image_url=https://your-image-path.png)
    ```

## Running Locally

To run this project on your local machine for development or testing, follow these steps.

### 1\. Prerequisites

First, ensure you have the necessary system dependencies installed. For Debian/Ubuntu-based systems:

```bash
sudo apt-get update
sudo apt-get install -y nodejs npm build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

You will also need the Vercel CLI:

```bash
npm i -g vercel
```

### 2\. Installation

Clone the repository and install the Node.js dependencies:

```bash
git clone https://github.com/jeanrodrigop/gitfetch.git
cd gitfetch
npm install
```

### 3\. Running the Development Server

Start the local development server using the Vercel CLI:

```bash
vercel dev
```

The server will typically start at `http://localhost:3000`. You can now test it by opening the following URL in your browser:

`http://localhost:3000/api?username=your-github-user`
#
<!-- ## Contributing

Contributions are welcome\! If you have ideas for new features, themes, or improvements, feel free to open an issue or submit a pull request. -->