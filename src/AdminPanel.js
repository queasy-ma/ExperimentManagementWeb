import React, { useState, useEffect } from 'react';
import { AppBar, Tabs, Tab, Drawer, IconButton, Box, Typography, Toolbar,Card, CardContent, CardActions, Button  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {BASE_PATH, DefaultApi} from './gen';
import AddCourseDialog from './AddCourseDialog';
import AddExperimentDialog from './AddExperimentDialog';
import AddExperimentContentDialog from './AddExperimentContentDialog';
import ExportDataDialog from  './ExportDataDialog';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// 假设数据已经在 data 中
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const drawerWidth = 240;
const api = new DefaultApi();
const tabNames = ["课程管理", "实验管理", "实验内容管理", "数据导出", "综合数据展示"];

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
const getExperimentTypesStatistics = (data) => {
    const typesMap = new Map();
    data?.courses.forEach((course) => {
        course.experiments.forEach((experiment) => {
            typesMap.set(experiment.type, (typesMap.get(experiment.type) || 0) + 1);
        });
    });
    return Array.from(typesMap.keys()).map((type) => ({ name: type, value: typesMap.get(type) }));
};

const RenderPieChart = ({ data }) => {
    const experimentTypesStatistics = getExperimentTypesStatistics(data);
    return (
        <PieChart width={400} height={400}>
            <Pie dataKey="value" isAnimationActive={false} data={experimentTypesStatistics} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {experimentTypesStatistics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend />
        </PieChart>
    );
};

// 在 AdminPanel 组件中
const StatisticsPanel = ({ data }) => {
    const courseCount = data?.courses.length || 0;
    const experimentCount = data?.courses.reduce((acc, course) => acc + course.experiments.length, 0) || 0;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4">课程和实验统计</Typography>
            <Typography variant="h6">课程数量: {courseCount}</Typography>
            <Typography variant="h6">实验数量: {experimentCount}</Typography>
            <RenderPieChart data={data} />
        </Box>
    );
};
const handleDeleteCourse = async (courseId) => {
    try {
        // 调用API删除课程
        await api.deleteCourse({id: courseId});
        // 成功删除，刷新页面
        window.location.reload();
    } catch (error) {
        console.error("删除课程失败:", error);
        alert("删除课程失败");
    }
};
const handleDeleteExperiment = async (experimentId) => {
    try {
        // 调用API删除课程
        await api.deleteExperiment({id: experimentId});
        // 成功删除，刷新页面
        window.location.reload();
    } catch (error) {
        console.error("删除实验失败:", error);
        alert("删除实验失败");
    }
};

const handleDeleteExperimentContent = async (experimentContentId) => {
    try {
        // 调用API删除课程
        await api.deleteExperimentContent({id: experimentContentId});
        // 成功删除，刷新页面
        window.location.reload();
    } catch (error) {
        console.error("删除实验内容失败:", error);
        alert("删除实验内容失败");
    }
};



export default function AdminPanel() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await api.getAllData();
                setData(result);
            } catch (error) {
                console.error("获取数据失败:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };



    const [openCourseDialog, setOpenCourseDialog] = useState(false);
    const [openExperimentDialog, setOpenExperimentDialog] = useState(false);
    const [openExperimentContentDialog, setOpenExperimentContentDialog] = useState(false);

    // 处理打开对话框的函数
    const handleOpenCourseDialog = () => setOpenCourseDialog(true);
    const handleOpenExperimentDialog = () => setOpenExperimentDialog(true);
    const handleOpenExperimentContentDialog = () => setOpenExperimentContentDialog(true);

    // 处理关闭对话框的函数
    const handleCloseDialog = () => {
        console.log("Closing dialog...");
        setOpenCourseDialog(false);
        setOpenExperimentDialog(false);
        setOpenExperimentContentDialog(false);
    };

    const handleConfirmCourse = async (name, description) => {
        const courseDto = { name, description }; // 根据你的API需要构造DTO
        try {
            await api.createCourse({ courseDto });
            alert("课程添加成功");
            // 这里你可以添加额外的逻辑，比如关闭对话框，刷新课程列表等
            handleCloseDialog();
            // 假设你有一个方法来重新获取课程数据并更新UI
            window.location.reload();
        } catch (error) {
            console.error("增加课程失败:", error);
            alert("增加课程失败");
        }
    };
    const handleConfirmExperiment = async (title, type,courseId ) => {
        const experimentDto = { title, type ,courseId}; // 构造DTO
        try {
            await api.createExperiment({ experimentDto });
            alert("实验添加成功");
            handleCloseDialog();
            // 重新获取数据
            window.location.reload();
        } catch (error) {
            console.error("增加实验失败:", error);
            alert("增加实验失败");
        }
    };

    const handleConfirmExperimentContent = async (details, experimentId ) => {
        const experimentContentDto = { details ,experimentId}; // 构造DTO
        try {
            await api.createExperimentContent({ experimentContentDto });
            alert("实验内容添加成功");
            handleCloseDialog();
            // 重新获取数据
            window.location.reload();
        } catch (error) {
            console.error("增加实验内容失败:", error);
            alert("增加实验内容失败");
        }
    };

    const [openExportDialog, setOpenExportDialog] = useState(false);

    const handleOpenExportDialog = () => setOpenExportDialog(true);
    const handleCloseExportDialog = () => setOpenExportDialog(false);

    const handleExport = async (selectedCourses, selectedExperiments, exportType) => {
        try {
            // 基础URL，包括了API的基础路径和导出类型
            const baseUrl = `http://114.116.239.178:8080/export/${exportType}`;

            // 使用URLSearchParams来构建查询字符串
            const params = new URLSearchParams();

            // 为每个选中的课程和实验ID添加参数
            selectedCourses.forEach(courseId => params.append('courseIds', courseId));
            selectedExperiments.forEach(experimentId => params.append('experimentIds', experimentId));

            // 构建最终的URL
            const url = `${baseUrl}?${params.toString()}`;

            // 在控制台打印最终的URL，用于调试
            console.log("导出URL创建成功:", url);

            // 使用 window.open 在新标签页中打开导出URL
            window.open(url, '_blank');
        } catch (error) {
            console.error("导出失败:", error);
            // 在此处处理导出失败的情况
        }
    };





    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setDrawerOpen(true)}
                        sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                        {tabNames[selectedTab]}
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="placeholder"
                        sx={{ visibility: 'hidden' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                sx={{
                    width: drawerWidth,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <IconButton onClick={() => setDrawerOpen(false)}>
                    <ChevronLeftIcon />
                </IconButton>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={selectedTab}
                    onChange={handleChange}
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {tabNames.map((name, index) => (
                        <Tab key={name} label={name} />
                    ))}
                </Tabs>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
            >
                <Toolbar />


                {/* 为每个TabPanel添加一个按钮 */}
                {selectedTab === 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleOpenExportDialog}>导出数据</Button>
                        <Button variant="contained" color="primary" onClick={handleOpenCourseDialog}>增加课程</Button>
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" color="secondary" onClick={handleOpenExportDialog}>导出数据</Button>
                        <Button variant="contained" color="primary" onClick={handleOpenExperimentDialog}>增加实验</Button>
                    </Box>
                )}
                {selectedTab === 2 && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleOpenExperimentContentDialog}>增加实验内容</Button>
                    </Box>
                )}
                {/* 根据需要为其他Tab添加更多按钮 */}

                <AddCourseDialog open={openCourseDialog} onClose={handleCloseDialog} handleConfirm={handleConfirmCourse} />
                <AddExperimentDialog open={openExperimentDialog} onClose={handleCloseDialog} handleConfirm={handleConfirmExperiment}  courses={data?.courses ?? []}/>
                <AddExperimentContentDialog open={openExperimentContentDialog} onClose={handleCloseDialog} handleConfirm={handleConfirmExperimentContent} experiments={data && data.courses ? data.courses.reduce((acc, course) => [...acc, ...course.experiments], []) : []}/>

                <ExportDataDialog open={openExportDialog} onClose={handleCloseExportDialog} data={data} onExport={handleExport}/>




                {/* 课程管理 */}
                <TabPanel value={selectedTab} index={0}>
                    {data && data.courses.map((course) => (
                        <Card key={course.id} sx={{ mb: 2, maxWidth: "100%", mx: "auto", borderRadius: "16px", boxShadow: 3 }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {course.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {course.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleDeleteCourse(course.id)}>删除课程</Button>
                            </CardActions>
                        </Card>
                    ))}
                </TabPanel>


                {/* 实验管理，使用Card优化显示 */}
                <TabPanel value={selectedTab} index={1}>
                    {data && data.courses.map((course) =>
                        course.experiments.map((experiment) => (
                            <Card key={experiment.id} sx={{ mb: 2, maxWidth: "100%", mx: "auto", borderRadius: "16px", boxShadow: 3 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        实验: {experiment.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        课程: {course.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        类型: {experiment.type}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small" color="primary" onClick={() => handleDeleteExperiment(experiment.id)}>删除实验</Button>
                                </CardActions>
                            </Card>
                        ))
                    )}
                </TabPanel>

                {/* 实验内容管理 */}
                <TabPanel value={selectedTab} index={2}>
                    {data && data.courses.map((course) =>
                        course.experiments.map((experiment) =>
                            experiment.experimentContents.map((content) => (
                                <Card key={content.experimentId + content.details} sx={{ mb: 2, maxWidth: "100%", mx: "auto", borderRadius: "16px", boxShadow: 3 }}>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            详情: {content.details}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            课程: {course.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            实验: {experiment.title}
                                        </Typography>

                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => handleDeleteExperimentContent(content.id)}>删除实验内容</Button>
                                    </CardActions>
                                </Card>
                            ))
                        )
                    )}
                </TabPanel>

                <TabPanel value={selectedTab} index={4}>
                    <StatisticsPanel data={data} />
                </TabPanel>
                {/* 其他 TabPanel 的内容可以按照类似的模式添加和优化 */}
            </Box>
        </Box>
    );
}
