import css from './LoaderPet.module.css';

export const LoaderPet = () => {
  return (
    <div className={css.loader}>
      <div className={css.dog}>
        <div className={css.dogBody}>
          <div className={css.dogTail}>
            <div className={css.dogTail}>
              <div className={css.dogTail}>
                <div className={css.dogTail}>
                  <div className={css.dogTail}>
                    <div className={css.dogTail}>
                      <div className={css.dogTail}>
                        <div className={css.dogTail}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={css.dogTorso}></div>
        <div className={css.dogHead}>
          <div className={css.dogEars}>
            <div className={css.dogEar}></div>
            <div className={css.dogEar}></div>
          </div>
          <div className={css.dogEyes}>
            <div className={css.dogEye}></div>
            <div className={css.dogEye}></div>
          </div>
          <div className={css.dogMuzzle}>
            <div className={css.dogTongue}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderPet;
