import { useEffect } from 'react'

const Resume = () => {
    useEffect(() => {
        window.location.replace('https://drive.google.com/file/d/1yzX9nwrqFNSwsjiWgZcjINS-JPrVPUei/view?usp=sharing');
    }, []);

    return null;
};

export default Resume