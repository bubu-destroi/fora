const About = () => {
    const imgURL =   'https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-routing/about.gif';

    return (
        <div>
            <h1>About</h1>
            <img src={imgURL} className="about" />
        </div>

    )
}

export default About