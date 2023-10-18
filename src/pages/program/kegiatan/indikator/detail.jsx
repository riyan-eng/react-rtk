import { Avatar, Col, Divider, Drawer, List, Row, Button } from 'antd';
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { uploadIndikatorKinerja } from '../../../../feature/indikator_kinerja/indikatorKinerjaSlice';
import { useSelector } from 'react-redux';
// import { Generate } from './surat';
import { saveFile, getTemplate } from './surat';
import { TemplateHandler } from 'easy-template-x';

const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
);
const App = ({ data }) => {

    const uploadProvider = useSelector(state => state.indikatorKinerja.upload)
    // console.log(uploadProvider);
    // console.log(data);
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
        console.log("la");
        uploadIndikatorKinerja({
            id: data.id
        })
        console.log("lo");
    };
    const onClose = () => {
        setOpen(false);
    };

    async function generate() {
        const templateFile = await getTemplate()
        const data = {
            "Beers": [
                { "Brand": "Carlsberg", "Price": 1 },
                { "Brand": "Leaf Blonde", "Price": 2 },
                { "Brand": "Weihenstephan", "Price": 1.5 }
            ],
            posts: [
                { author: 'Alon Bar', text: 'Very important\ntext here!' },
                { author: 'Alon Bar', text: 'Forgot to mention that...' }
            ],
            lembar: 2,
            nama: "Muhammad Ridwan",
            bangsa: "Indonesia",
            agama: "Islam",
            tempat_lahir: "Kendal",
            ttl: "Minggu, 20 Oktober 2020",
            alamat: "Jl. Manggis 5 Desa Kranggah - Kecamatan Kendal - Kabupaten Kendal",
            nomor: "1/2d/2021",
            kecamatan: "Bandar",
            kelurahan: "Ponowareng"
        }
        const handler = new TemplateHandler()
        const doc = await handler.process(templateFile, data);
        saveFile('myTemplate - output.docx', doc);
    }


    return (
        <>
            <Button type="link" onClick={showDrawer} icon={<InfoCircleOutlined />}>
            </Button>
            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={open}>
                <p
                    className="site-description-item-profile-p"
                    style={{
                        marginBottom: 24,
                    }}
                >
                    Detail
                </p>
                <p className="site-description-item-profile-p">Data</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Nama" content={data.nama} />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Target anggaran" content={data.target_anggaran} />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Target capaian" content={data.target_capaian} />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Satuan target capaian" content={data.satuan_target_capaian} />
                    </Col>
                </Row>

                <Divider />
                <p className="site-description-item-profile-p">Dokumentasi</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="RKA" content="AntDesign@example.com" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="LPJ" content="+86 181 0000 0000" />
                        <Button onClick={generate}>Generate</Button>
                    </Col>
                </Row>

            </Drawer>
        </>
    );
};
export default App;