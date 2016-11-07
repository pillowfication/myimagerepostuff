This is a place where I refine my searchtags so I can download art which I think is nice.

nyaa


## Something for DanbooruDownloader

```
%searchtag%\%rating% - %id% - %artist% - %copyright% - %character
```

## Compile the .xlsx to .json

Please have Node and npm installed on your machine.

1. Navigate to the repository folder (`cd myimagerepostuff`)
2. Install necessary dependencies with `npm install`. (You only need to do this step once).
3. Run the compile script with `npm run compileJSON`.

You can also add this compile stage as a `pre-commit` hook.

1. `ln -s -f ../../hooks/post-merge .git/hooks/post-merge`

## Build the website

1. Install dependencies with `npm install`.
2. Run setup with `npm run setup`.
3. Startup the Express server with `npm run server`.
4. View the app at `localhost:3000`
