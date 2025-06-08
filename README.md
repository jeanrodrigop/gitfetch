<h1 align="center">
  <a href="https://gitfetch-flax.vercel.app/api?username=jeanrodrigop&country=Brazil&state=Sao%20Paulo&since=1993&timezone=UTC-03&portfolio=Github&distros=Manjaro,%20Fedora&like=Virtualization&role=Cloud/DevOps/SRE" target="_blank">
    <img 
      alt="gitfetch" 
      title="gitfetch" 
      src="https://gitfetch-flax.vercel.app/api?username=jeanrodrigop&country=Brazil&state=Sao%20Paulo&since=1993&timezone=UTC-03&portfolio=Github&distros=Manjaro,%20Fedora&like=Virtualization&role=Cloud/DevOps/SRE" 
    />
  </a>
</h1>

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
![GitFetch](https://gitfetch-flax.vercel.app/api?username=your-github-user)
```

#### Customization Options

You can customize the card's appearance with URL parameters:

  * **`theme`**: `light` or `default`: Use the theme parameter to change the look.
  
      ```markdown
      ...&theme=light
      ```
  * **`image_url`**: Use image_url to replace your avatar with a custom image.
  
      ```markdown
      ...&image_url=[https://your-image-path.png](https://your-image-path.png)
      ```
  * **Informations**: Add information that is not in the GitHub API.
  
    * `country` (Ex.: Brazil)
    * `state` (Ex.: Sao Paulo)
    * `since` (Ex.: 1993)
    * `timezone` (Ex.: UTC-03)
    * `portfolio` (Ex.: My page)
    * `distros` (Ex.: Manjaro, Fedora)
    * `like` (Ex.: Virtualization)
    * `role` (Ex.: Cloud/DevOps/SRE)

  * **Example of URL**

    ```markdown
    https://gitfetch-flax.vercel.app/api?username=jeanrodrigop&country=Brazil&state=Sao%20Paulo&since=1993&timezone=UTC-03&portfolio=Github&distros=Manjaro,%20Fedora&like=Virtualization&role=Cloud/DevOps/SRE
    ``` 
  * **To use in your README**

    ```markdown
    ![GitFetch](https://gitfetch-flax.vercel.app/api?username=jeanrodrigop&country=Brazil&state=Sao%20Paulo&since=1993&timezone=UTC-03&portfolio=Github&distros=Manjaro,%20Fedora&like=Virtualization&role=Cloud/DevOps/SRE)
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
