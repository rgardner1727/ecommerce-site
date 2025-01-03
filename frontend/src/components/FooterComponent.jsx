import '../styles/footer.css';

const FooterComponent = () => {
    return (
        <footer className='footer'>
            <section className='contacts-section'>
                <h3 className='contacts-header'>MY LINKS</h3>
                <ul className='contacts-list'>
                    <li className='contacts-item'><a className='contacts-item-link' href='https://www.linkedin.com/in/ryan-gardner-020920306'>LinkedIn</a></li>
                    <li className='contacts-item'><a className='contacts-item-link' href='https://github.com/rgardner1727'>GitHub</a></li>
                    <li className='contacts-item'><a className='contacts-item-link' href='mailto:rgardner1727@gmail.com'>Email</a></li>
                </ul>
            </section>
        </footer>
    )
}

export default FooterComponent;