export default {
    name: 'primarySkills',
    title: 'Primary Skills',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'priority',
            title: 'Priority',
            type: 'number'
        },
        {
            name:'icon',
            title:'Icon',
            type: 'image',
            options: {
              hotspot: true,
            },
        }
    ] 
}