export class Tag {
    readonly id: string;
    private _name: string;    
    private _parent: Tag | undefined;
    private readonly _chrildren: Tag[] = [];    

    constructor(name: string, id: string = crypto.randomUUID()){
        this.id = id;
        this._name = Tag.cleanName(name);
        // segura um pouco ae
    }

    get name(): string{ return this._name;}
    get parent(): Tag | undefined{ return this._parent}
    get children(): readonly Tag[] { return this._chrildren}

    rename(name: string): void { this._name = Tag.cleanName(name)}
    ancestors(): Tag[] { 
        const result: Tag[] = [];
        let current = this.parent;
        while (current !== undefined){
            result.unshift(current);
            current = current._parent;
        }
        return result;
    }
    descendants(): Tag[] { return this._chrildren.flatMap(child => [child, ...child.descendants()]);}
    isDescendantOf(other: Tag): boolean{ return this.ancestors().includes(other)}
    moveTo(newParent: Tag | undefined): void{
        if (newParent === this){
            throw new Error("Uma Tag não pode ser filha de si mesma");
        }
        if (newParent !== undefined && newParent .isDescendantOf(this)){
            throw new Error("Uma Tag não pode ser movida para dentro de um descendente");
        }
        if (newParent === this._parent) return;
        if (this._parent !== undefined) {
            const index = this._parent._chrildren.indexOf(this);
            this._parent._chrildren.splice(index, 1);
        }
        this._parent = newParent;
        if (newParent !== undefined) newParent._chrildren.push(this);
    }

    private static cleanName(name: string): string {
        const clean = name.trim();
        if (clean == "") throw new Error("O nome da tag não pode ser vazio");
        return clean;
    }
}