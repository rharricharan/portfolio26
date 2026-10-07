import './Styles/Home.css';
import Navigation from '../Components/Navigation';
import ProjectCard from '../Components/ProjectCard';
import ExampleShift from '../Assets/example-shift.svg';
import ExampleSmartstop from '../Assets/example-smartstop.svg';

function Home() {

    const projects = [
        { 
            id: 'project-one',
            title: 'Shift AI',
            description: 'Rebuilt the entire app from the ground up',
            imageUrl: ExampleShift,
            imageAlt: 'Picture of Shift AI App',
            projectUrl: '/projects/project-one'
        },
        { 
            id: 'project-two',
            title: 'Smartstop',
            description: 'Built the entire platform from the ground up',
            imageUrl: ExampleSmartstop,
            imageAlt: 'Picture of Smartstop App',
            projectUrl: '/smartstop'
        },
        { 
            id: 'project-three',
            title: 'Shift AI',
            description: 'Rebuilt the entire app from the ground up',
            imageUrl: ExampleShift,
            imageAlt: 'Picture of Shift AI App',
            projectUrl: '/projects/project-three'
        }
    ];

    return (
        <>
            <Navigation />
            <main className="home-page" id="home">
                <div className="home-page__content">
                    <h1 className="home-page__title">A Maryland based Designer building experiences that feel natural and produce real world results and value.</h1>
                    <a className="home-page__cta" href="/About">
                        Get to know Ryan
                    </a>
                </div>
                <div className="home-page__project-container">
                    {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} />
                    ))}
                </div>
            </main>
        </>
    );
}

export default Home;