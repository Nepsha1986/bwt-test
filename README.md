# GROUP BWT Test Assignment

## Test Assignment Overview

The program accepts a single argument: the path to an input file. It calculates commission fees for each operation and
outputs the results to stdout. Each line of output contains the final calculated commission fee without currency.

For more details, refer to [the assignment details](https://gist.github.com/naymkazp/8b2fd61412af4a974d058933c9b6fd18).

## Installation

To install the script, clone the repository and run:

```bash
npm install
```

This command installs all required dependencies. Ensure you are using Node.js version 12.x or higher.

## Development

From the root directory of the project, run:

```bash
    npm run dev
```

This command executes the script and outputs the commission fee for the data in ``input.json`` to the console.

### Tests and Linters

To check code quality, run:

```bash
    npm run check
```

This command will run linters and tests, although you can do it separately. ``npm run lint`` and ``npm run test``

## Usage

To calculate commission fees from your own JSON input file, run:

```bash
    node index.js '${your-json-file.json}'
```

Make sure to replace ``${your-json-file.json}`` with the path to your JSON input file. Ensure all dependencies are
installed before running.

Example:

```bash
    node index.js input.json
```