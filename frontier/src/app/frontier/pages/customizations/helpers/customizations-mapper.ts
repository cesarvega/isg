import { ChildEntity } from "src/app/frontier/utils/store/interfaces/quote";

export class CustomizationsMapper {

    mapCustomsizations(customizations): ChildEntity[] {
        this.mapHelper(customizations, null)
        return customizations;

    }

    mapHelper(customizations, parent) {
        for (let customization of customizations) {
            if (parent) {
                if (this.hasAction(customization) && !this.hasAction(parent)) {
                    parent.isContainer = true;
                    customization.hasAction = true;
                }
            }
            if (this.hasChildren(customization)) {
                this.mapHelper(customization.ChildEntity, customization);
            }
        }
    }


    hasAction(childEntity) {
        return (childEntity.hasOwnProperty("Active") || childEntity.hasOwnProperty("ConfiguredValue"))
    }

    hasOptionsToSelect(childEntity) {
        return parseInt(childEntity.maximumActiveChildEntities) > 0

    }

    hasChildren(childEntity) {
        return childEntity.hasOwnProperty("ChildEntity");
    }

}