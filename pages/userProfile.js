const UserProfile = props => {
  return <h1>{props.userName}</h1>;
};

export default UserProfile;

export async function getServerSideProps(context) {
  return {
    props: {
      userName: "max",
    },
  };
}
