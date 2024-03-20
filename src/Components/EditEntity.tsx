import { TEditEntity, TGenericObject } from '@/types'
import React from 'react'

export default function EditEntity({ pageName, entity, handleEdit, HandleCancel }: TEditEntity) {
    const disabledProperties = ["Id", "Uid", "UserId", "DateCreated", "Product"]

    const handleEditEntity = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
        let editedProperties: TGenericObject = {
            Id: entity.Id,
            Uid: entity.Uid
        }
        Object.keys(entity).map(key => {
            if(disabledProperties.includes(key)) return
            if(entity[key] !== formData[key]) editedProperties[key] = formData[key]
        })
        handleEdit(editedProperties)
    }

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-95 py-2 px-5 grid grid-cols-1 gap-1">
            <div className="w-full grid justify-center">
                <h3 className="font-bold w-full border-b border-blue-900 py-2 border-opacity-30">Edit {pageName}</h3>
                <div>
                    <form className="grid gap-5 w-fit" onSubmit={handleEditEntity}>
                        <div className="grid grid-cols-2 gap-5">
                            {Object.entries(entity).map((entry, indx) =>
                                <div key={entry[0]}>
                                    <div className="font-bold ml-1">{entry[0]}</div>
                                    {(disabledProperties.includes(entry[0])) ? 
                                        <input className="border border-blue-900 rounded p-2 w-96" type="text" name={entry[0]} value={entry[1]} disabled/> 
                                        : 
                                        <input className="border border-blue-900 rounded p-2 w-96" type="text" name={entry[0]} defaultValue={entry[1]}/>
                                    }
                                    
                                </div>
                            )}
                        </div>
                        <div className="flex gap-5 justify-center border-t border-blue-900 py-5 border-opacity-30">
                            <div className="w-32 h-10 flex justify-center items-center px-2 border border-blue-600 text-blue-600 rounded cursor-pointer hover:shadow-lg" onClick={() => {HandleCancel(prev => prev = {})}}>Cancel</div>
                            <input type="submit" value="Save" className="w-32 h-10 px-3 bg-blue-600 text-white rounded cursor-pointer hover:shadow-lg" />
                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
