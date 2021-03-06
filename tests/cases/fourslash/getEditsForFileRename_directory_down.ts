/// <reference path='fourslash.ts' />

// @Filename: /a.ts
/////// <reference path="./src/old/file.ts" />
////import old from "./src/old";
////import old2 from "./src/old/file";
////export default 0;

// @Filename: /src/b.ts
/////// <reference path="./old/file.ts" />
////import old from "./old";
////import old2 from "./old/file";
////export default 0;

// @Filename: /src/foo/c.ts
/////// <reference path="../old/file.ts" />
////import old from "../old";
////import old2 from "../old/file";
////export default 0;

// @Filename: /src/newDir/new/index.ts
////import a from "../../a";
////import a2 from "../b";
////import a3 from "../foo/c";
////import f from "./file";
////export default 0;

// @Filename: /src/newDir/new/file.ts
////

// @Filename: /tsconfig.json
////{ "files": ["a.ts", "src/b.ts", "src/foo/c.ts", "src/old/index.ts", "src/old/file.ts"] }

verify.getEditsForFileRename({
    oldPath: "/src/old",
    newPath: "/src/newDir/new",
    newFileContents: {
        "/a.ts":
`/// <reference path="./src/newDir/new/file.ts" />
import old from "./src/newDir/new";
import old2 from "./src/newDir/new/file";
export default 0;`,

        "/src/b.ts":
`/// <reference path="./newDir/new/file.ts" />
import old from "./newDir/new";
import old2 from "./newDir/new/file";
export default 0;`,

        "/src/foo/c.ts":
`/// <reference path="../newDir/new/file.ts" />
import old from "../newDir/new";
import old2 from "../newDir/new/file";
export default 0;`,

        "/src/newDir/new/index.ts":
`import a from "../../../a";
import a2 from "../../b";
import a3 from "../../foo/c";
import f from "./file";
export default 0;`,

        "/tsconfig.json":
`{ "files": ["a.ts", "src/b.ts", "src/foo/c.ts", "src/newDir/new/index.ts", "src/newDir/new/file.ts"] }`,
    },
});
