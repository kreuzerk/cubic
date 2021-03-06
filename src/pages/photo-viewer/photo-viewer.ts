import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CameraService} from './camera.service';
import {CameraMock} from './camera.mock';
import {Camera} from "@ionic-native/camera";

enum IMAGE_POSITION {
    LEFT,
    RIGHT
}

@Component({
    selector: 'photo-editor',
    templateUrl: 'photo-viewer.html',
    providers: [
        // Use only in the browser
        //{provide: Camera, useClass: CameraMock},
        Camera,
        CameraService
    ]
})
export class PhotoEditorPage {

    leftImageData: string
    rightImageData: string

    constructor(private cameraService: CameraService, public navCtrl: NavController) {
    }

    goBack(){
       this.navCtrl.pop()
    }

    takeLeftPicture(): void {
        this.takePicture(IMAGE_POSITION.LEFT)
    }

    takeRightPicture(): void {
        this.takePicture(IMAGE_POSITION.RIGHT)
    }

    takePicture(imagePosition: IMAGE_POSITION) {
        this.cameraService.takePicture()
            .then(encodedImageData => {
                if (imagePosition === IMAGE_POSITION.LEFT) {
                    this.leftImageData = encodedImageData
                } else {
                    this.rightImageData = encodedImageData
                }
            })
    }

}
