export default {
    name: 'tagList',
    title: 'Tag List',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'tag',
            title: 'Tag Name',
            type: 'reference',
            to: { type: 'tags' },
        }
    ]
}