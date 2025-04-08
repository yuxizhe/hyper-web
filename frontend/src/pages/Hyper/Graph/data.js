export default () => {
    return {
        vertices: {
            "MONSTROUS CHIN": {
                "entity_type": "CONCEPT",
                "description": "A physical attribute symbolizing greed and gluttony, represented by the character with a large, exaggerated chin in the dialogue amongst the merchants.",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "additional_properties": "greed, excess",
                "entity_name": "MONSTROUS CHIN"
            },
            "SNUFF-BOX": {
                "entity_type": "CONCEPT",
                "description": "An item used for consuming snuff, representing luxury and leisure among wealthy individuals, highlighting their indifference to the death of a fellow merchant.",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "additional_properties": "luxury, indifference",
                "entity_name": "SNUFF-BOX"
            },
            "FAT MAN": {
                "entity_type": "PERSON",
                "description": "A character grouped with other merchants, characterized by his obesity and lethargy, seemingly apathetic towards societal issues.",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "additional_properties": "apathy, wealth",
                "entity_name": "FAT MAN"
            },
            "RED-FACED GENTLEMAN": {
                "entity_type": "PERSON",
                "description": "Another merchant characterized by his physical appearance and demeanor, illustrating the attitude of the wealthy towards the death of others.",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "additional_properties": "indifference, wealth",
                "entity_name": "RED-FACED GENTLEMAN"
            },
            "GREAT GOLD SEALS": {
                "entity_type": "CONCEPT",
                "description": "Symbols of wealth and status among merchants, representing the materialistic values of the time.",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "additional_properties": "status, wealth",
                "entity_name": "GREAT GOLD SEALS"
            }
        },
        edges: {
            "FAT MAN|#|MONSTROUS CHIN": {
                "description": "The character of the fat man, with his monstrous chin, embodies the excesses and apathetic nature of the wealthy merchants towards societal issues.",
                "keywords": "greed, excess",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "weight": 7.0
            },
            "RED-FACED GENTLEMAN|#|SNUFF-BOX": {
                "description": "The use of a snuff-box by the red-faced gentleman represents his wealth while showcasing his indifference to the serious topic of death discussed.",
                "keywords": "luxury, indifference",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "weight": 6.0
            },
            "FAT MAN|#|GREAT GOLD SEALS": {
                "description": "The great gold seals symbolize the status of the fat man and reinforce the materialistic values held by the businessmen in the scene.",
                "keywords": "status, materialism",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "weight": 7.0
            },
            "FAT MAN|#|GREAT GOLD SEALS|#|MONSTROUS CHIN|#|RED-FACED GENTLEMAN|#|SNUFF-BOX": {
                "description": "The interactions and physical portrayals among the fat man and the red-faced gentleman, along with exaggerated attributes such as the monstrous chin and items like the snuff-box and great gold seals, reflect the overarching theme of materialism and apathy towards mortality in wealthy society, emphasizing their disconnect from the value of human life.",
                "keywords": "materialism, apathy, wealth",
                "source_id": "chunk-02baee20cc9463dbe08170a8e1043e32",
                "weight": 8.0
            }
        }
    }
}