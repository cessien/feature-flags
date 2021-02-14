export function addFeature(feature) {
    return fetch(`/features`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feature),
    })
}

export function removeFeature(feature) {
    return fetch(`/features/${feature.key}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export function updateFeature(feature) {
    return fetch(`/features/${feature.key}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(feature),
    })
}

export function getFeature(key) {
    return fetch(`/features/${key}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export function getFeatures() {
    return fetch(`/features`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
}

export default {
    getFeatures,
    getFeature,
    addFeature,
    removeFeature,
    updateFeature,
}