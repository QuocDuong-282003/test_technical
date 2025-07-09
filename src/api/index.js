import reactImage from '../assets/image/reactJs.avif';
import vueImage from '../assets/image/vue-js-3.jpg';
import uiuxImage from '../assets/image/uxui.avif';
import aiImage from '../assets/image/machine-learning.png';
import englishImage from '../assets/image/speakerEnglish.avif';


const mockProducts = [
    {
        id: 'p1', name: 'Khoá học ReactJS từ A đến Z', price: 799000,
        description: 'Học ReactJS chuyên sâu qua các dự án thực tế.',
        longDescription: 'Đây là khoá học đầy đủ nhất về ReactJS, bao gồm Hooks, Context, Redux, và các dự án thực tế như xây dựng trang e-commerce, blog. Bạn sẽ được học các khái niệm cốt lõi và cách áp dụng chúng để xây dựng ứng dụng web hiện đại.',
        image: reactImage, rating: 4.8
    },
    {
        id: 'p2', name: 'Lập trình VueJS 3 cho người đi làm', price: 699000,
        description: 'Nắm vững Vue 3, Composition API, Pinia.',
        longDescription: 'Khoá học này tập trung vào các tính năng mới nhất của Vue 3. Chúng tôi sẽ hướng dẫn bạn cách xây dựng một ứng dụng phức tạp từ đầu, tối ưu hóa hiệu năng và quản lý state hiệu quả với Pinia.',
        image: vueImage, rating: 4.9
    },
    {
        id: 'p3', name: 'Thiết kế UI/UX cho ứng dụng di động', price: 1200000,
        description: 'Học thiết kế giao diện và tối ưu trải nghiệm.',
        longDescription: 'Bạn sẽ học về các nguyên tắc thiết kế, cách sử dụng Figma, tạo prototype và kiểm thử người dùng. Khoá học phù hợp cho cả lập trình viên và designer muốn nâng cao kỹ năng.',
        image: uiuxImage, rating: 4.7
    },
    {
        id: 'p4', name: 'Master AI và Machine Learning', price: 2500000,
        description: 'Khám phá thế giới Trí tuệ nhân tạo.',
        longDescription: 'Khoá học bao gồm các kiến thức nền tảng về toán, Python, các thư viện như NumPy, Pandas, Scikit-learn, và các mô hình Machine Learning thực tế.',
        image: aiImage, rating: 5.0
    },
    {
        id: 'p5',
        name: 'Tiếng Anh giao tiếp cho lập trình viên', price: 450000,
        description: 'Tự tin giao tiếp và đọc tài liệu chuyên ngành.',
        longDescription: 'Khoá học tập trung vào các tình huống thực tế trong ngành IT, từ việc thảo luận kỹ thuật, viết email, đến thuyết trình sản phẩm. Cải thiện kỹ năng mềm quan trọng nhất của bạn.',
        image: englishImage, rating: 4.6
    },
];

export const fetchProducts = () => new Promise(resolve => setTimeout(() => resolve({ data: mockProducts }), 500));

export const fetchSuggestions = (userId) => {
    console.log(`Đang lấy gợi ý cho người dùng: ${userId}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.85) { // 15% -> lỗi
                reject(new Error("Không thể kết nối đến máy chủ AI. Vui lòng thử lại sau."));
            } else {
                const shuffled = [...mockProducts].sort(() => 0.5 - Math.random());
                resolve({ data: shuffled.slice(0, 2) });
            }
        }, 1500); // Trễ 1.5s -> loading
    });
};