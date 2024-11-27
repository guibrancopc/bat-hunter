import { Avatar } from '../avatar';
// import { Avatar } from "@material-ui/core";
// import MatrixProfile from "../../profile";

// const useStyles = makeStyles((theme) => {
//   const isDark = theme.palette.type === "dark";

//   return {
//     label: {
//       marginBottom: "12px",
//       display: "inline-block",
//     },
//     avatar: {
//       backgroundColor: isDark ? "#6a6a6a" : "#c8dce6",
//       color: isDark ? "#fff" : "#303030",
//       width: "100px",
//       height: "100px",
//     },
//     userName: {
//       textAlign: "center",
//       padding: "16px 0",
//       fontSize: "24px",
//     },
//     profileSection: {
//       display: "flex",
//       justifyContent: "center",
//     },
//   };
// });

function getUserData() {
  return {
    id: '123',
    name: 'Gui',
    imageUrl: 'https://avatars.githubusercontent.com/u/11657454?v=4',
  };
}

export function MenuSectionProfile() {
  const user = getUserData();

  return (
    <section>
      <div>
        <span>Player</span>
      </div>
      <div>
        <Avatar src={decodeURIComponent(user.imageUrl)} />
      </div>
      <div>{user.name}</div>
    </section>
  );
}
