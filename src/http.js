export const fetchAvailablePlaces = async () => {
    const response = await fetch('http://localhost:3000/places');
    const resData = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch places')
    }

    return resData.places;
}

export const updateUserPlaces= async (places) => {
    const response = await fetch('http://localhost:3000/user-places', {
        method: 'PUT',
        body: JSON.stringify({places: places}), //since the name are the same you can just write ({places})
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const resData = await response.json();
    if (!response.ok){
        throw new Error('Failed to update user data.');
    }
    return resData.message;
}