class ClassNames {
    #classes: Set<string>;

    constructor(classes: string | undefined) {
        if(!classes) {
            this.#classes = new Set()
        } else {
            this.#classes = new Set<string>(classes.split(' '))
        }
    }

    add(newClasses: string) {
        var newLst = newClasses.split(' ')
        
        newLst.forEach((aClass) => {
            if(aClass) {
                this.#classes.add(aClass)
            }
        })
    }
    remove(targetClasses: string) {
        var targetLst = targetClasses.split(' ')
        
        targetLst.forEach((aClass) => {
            this.#classes.delete(aClass)
        })
    }

    toString(): string {
        let result: string = '';
        for (let aClass of this.#classes) {
            result += aClass
            result += ' '
        }
        return result
    }
}

export default ClassNames