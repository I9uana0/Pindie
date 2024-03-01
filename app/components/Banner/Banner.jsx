import Styles from "@/app/components/Banner/Banner.module.css"

export const Banner = () => (
    <section className={Styles.banner}>
        <div className={Styles.description}>
            <h1 className={Styles.title}>
                Портал инди-игр от&nbsp;студентов Яндекс Практикума
            </h1>
            <div className={Styles["text-block"]}>
                <p className={Styles.text}>
                    Студенты курсов разрабатывают свои игры на Unity, здесь мы их
                    публикуем. Вы можете играть прямо на сайте. А если у вас есть
                    аккаунт пользователя — получаете возможность голосовать за игры.
                </p>
            </div>
            <a href="#popular" className={`button ${"banner__link"}`}>
                Смотреть игры
            </a>
        </div>
        <img
            src="/images/banner-illustration.jpg"
            alt="Рука, утопленная в желтом фоне"
            className={"banner__image"}
        />
    </section>
);