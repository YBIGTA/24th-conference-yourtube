/*
시각적인 기능을 담당한다.
HTML과 직접 상호작용하고, background 스크립트와 함께 API를 호출
popup.html이 index.html과 같은 의미이다.
 */

import React from "react";
import {Box, Button, Typography} from "@mui/material";
import tubeImage from "../static/Tube.png";

const Popup = ({handleOpen, handleCategoryRequest}) => {


    return(
        <>
        <Box width={"80%"} height={"auto"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <img src={tubeImage} alt={"튜브 따봉 이미지"} width={"80%"}/>
            </Box>

            <Box width={"90%"} height={"auto"} marginBottom={2}>
                <Typography fontSize={12}>
                    마지막 업데이트:
                </Typography>
                <Typography fontSize={12}>
                    2024-06-07 14시 32분
                </Typography>
            </Box>

            <Box marginBottom={2}>
                <Button variant={"contained"} onClick={handleOpen}>
                    구독 영상 가져오기
                </Button>
            </Box>
            <Box marginBottom={2}>
                <Button variant={"contained"} onClick={handleCategoryRequest}>
                    카테고리 분류
                </Button>
            </Box>
        </>
    )
}

export default Popup;