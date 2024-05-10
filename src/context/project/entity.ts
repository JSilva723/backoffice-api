interface ObjValues {
    id?: number
    name?: string
}

export class Project {
    constructor(
        public id?: number,
        public name?: string,
    ) { }

    public static fromObject(obj: ObjValues): Project {
        const { id, name } = obj
        if (!id) throw 'Id is required'
        if (!name) throw 'Name is required'

        return new Project(id, name)
    }
}