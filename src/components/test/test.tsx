import {useEffect, useReducer, useRef, useState} from "react";
import * as BABYLON from 'babylonjs'
import 'babylonjs-loaders'
import {Button} from "@/components/ui/button.tsx";
import LList from "@/components/test/list/LList.tsx";
import RList from "@/components/test/list/RList.tsx";
import Chart from "@/components/test/chart.tsx";

export type ButtonStatus = 'default' | 'loading' | 'pause' | 'reset'
export default function Test() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const cameraRef = useRef<BABYLON.ArcRotateCamera | null>(null)
    const engineRef = useRef<BABYLON.Engine | null>(null)
    const [buttonStatus, setButtonStatus] = useState<ButtonStatus>('default')
    const [componentsVisible, setComponentsVisible] = useState(false)

    useEffect(() => {
        const canvas = canvasRef.current
        const engine = new BABYLON.Engine(canvas, true)
        engineRef.current = engine
        const scene = new BABYLON.Scene(engine)

        const camera = new BABYLON.ArcRotateCamera('scene', Math.PI, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 0), scene)
        camera.attachControl()
        cameraRef.current = camera
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene)

        const rootURL = './src/assets/'
        const sceneFilenames: string[] = ['stage.glb', 'window.glb']

        const promises = sceneFilenames.map((name: string) => {
            return new Promise((resolve, reject) => {
                BABYLON.SceneLoader.ImportMesh(
                    "",
                    rootURL,
                    name,
                    scene,
                    null,
                    null,
                    (scene, message) => {
                        console.error(`Error loading meshes: ${message}`)
                        reject(message)
                    })
            })
        })

        Promise.all(promises)
            .then(() => {
                if (buttonStatus === 'default') {
                }
            })
            .catch((error) => console.error(`Error loading models: ${error}`))


        engine.runRenderLoop(() => scene.render())

        return () => engine.dispose()
    }, [])

    function handleClick() {
        const camera = cameraRef.current
        const positionAnimation = new BABYLON.Animation(
            'positionAnimation',
            'position',
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        )
        const targetAnimation = new BABYLON.Animation(
            "targetAnimation",
            "target",
            60,
            BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
            BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        )
        const positionKeys = [
            {frame: 0, value: camera?.position.clone()},
            {frame: 60, value: new BABYLON.Vector3(0, 1.5, 4.6)}
        ]
        const targetKeys = [
            {frame: 0, value: camera?.target.clone()},
            {frame: 60, value: new BABYLON.Vector3(2, 1.5, 4.6)},
        ]
        positionAnimation.setKeys(positionKeys)
        targetAnimation.setKeys(targetKeys)

        if (camera) {
            camera.animations = []
            camera.animations.push(positionAnimation)
            camera.animations.push(targetAnimation)

            camera.getScene().beginAnimation(
                camera,
                0,
                60,
                false,
                1,
                () => {
                    setComponentsVisible(true)
                }
            )
        }
    }

    return (
        <>
            <canvas ref={canvasRef} touch-action="none" className="w-full h-full"/>
            <img className="absolute left-0 bottom-0"
                 src="./src/assets/images/bottom.png"
                 alt=""/>
            <img className="absolute left-0 top-0"
                 src="./src/assets/images/top.png"
                 alt=""/>
            {
                componentsVisible && (
                    <>
                        <LList className="absolute animate-perspective-rotate-left" orientation="left" title="设备脉冲信息"/>
                        <RList className="absolute animate-perspective-rotate-right" orientation="right" title="设备脉冲信息"/>
                        {/*<Chart className="absolute animate-perspective-rotate-right" orientation="right" title="近30天运行状况"/>*/}
                    </>
                )
            }
            <Button
                className={'absolute bottom-2 left-1/2 transform -translate-x-1/2'}
                variant="outline"
                onClick={handleClick}>
                {buttonStatus === 'default' && '开始'}
                {buttonStatus === 'loading' && '加载...'}
            </Button>
        </>
    )
}