import fetch from "node-fetch"

export const getAvatar = (user) => {
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=128`
}

export const getNickname = (user) => {
    return (user?.global_name || user.username)
}

export const getInfo = async (id) => {
    const res = await fetch(
        `https://api.lanyard.rest/v1/users/${id}`
    ).then(async (r) => await r.json()).catch(() => null)

    if (res?.data) {
        return res.data
    }
}