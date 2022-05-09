import Container from "react-bootstrap/Container";

import {getTodayTimeStamp} from "../../../util/timeHandling";

/**
 * The about us page for our store.
 *
 * @returns {JSX.Element} The about us page.
 * @constructor
 */
const AboutUs = () => {
    return (
        <Container>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor nec nunc molestie dignissim.
                Aenean sed libero ex. Phasellus fermentum sollicitudin blandit. Fusce quis tempus felis. Proin eu
                luctus est. Nam consequat fringilla erat, eget convallis quam ultricies et. Curabitur rutrum a
                felis sit amet tincidunt. Donec hendrerit scelerisque pellentesque. Vestibulum id ipsum commodo,
                scelerisque nunc in, mattis elit. Aenean ultricies, lorem vel auctor lacinia, augue mi iaculis
                nisl, at tristique ligula mauris lobortis nibh. Donec in nisi eros.
            </p>
            <p>
                Date: {getTodayTimeStamp()}
            </p>
        </Container>
    )
};

export default AboutUs