export default defineEventHandler(async (event) => {
    // This is a mock API endpoint
    // In a real app, this would connect to a database

    const events = [
        {
            id: '1',
            title: 'Tech Conference 2023',
            description: 'Join us for the biggest tech conference of the year with speakers from around the world.',
            date: '2023-11-15',
            location: 'San Francisco, CA',
            image: '/images/tech-conference.jpg',
            organizer: 'Tech Events Inc.',
            category: 'Technology',
            attendees: 1200,
            price: 299
        },
        {
            id: '2',
            title: 'Music Festival',
            description: 'A three-day music festival featuring top artists from various genres.',
            date: '2023-12-10',
            location: 'Austin, TX',
            image: '/images/music-festival.jpg',
            organizer: 'Sound Productions',
            category: 'Music',
            attendees: 5000,
            price: 150
        },
        {
            id: '3',
            title: 'Art Exhibition',
            description: 'Explore contemporary art from emerging artists around the globe.',
            date: '2023-10-25',
            location: 'New York, NY',
            image: '/images/art-exhibition.jpg',
            organizer: 'Modern Art Foundation',
            category: 'Art',
            attendees: 800,
            price: 25
        },
        {
            id: '4',
            title: 'Food & Wine Festival',
            description: 'Taste exquisite dishes and wines from renowned chefs and wineries.',
            date: '2023-11-05',
            location: 'Napa Valley, CA',
            image: '/images/food-wine.jpg',
            organizer: 'Culinary Arts Association',
            category: 'Food',
            attendees: 1500,
            price: 85
        },
        {
            id: '5',
            title: 'Startup Pitch Night',
            description: 'Watch innovative startups pitch their ideas to investors and win funding.',
            date: '2023-10-30',
            location: 'Boston, MA',
            image: '/images/startup-pitch.jpg',
            organizer: 'Venture Capital Group',
            category: 'Business',
            attendees: 300,
            price: 50
        },
        {
            id: '6',
            title: 'Wellness Retreat',
            description: 'A weekend of yoga, meditation, and wellness workshops.',
            date: '2023-12-15',
            location: 'Sedona, AZ',
            image: '/images/wellness-retreat.jpg',
            organizer: 'Mindful Living Co.',
            category: 'Health',
            attendees: 200,
            price: 350
        }
    ]

    return events
})