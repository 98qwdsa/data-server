const server = {
  _Average: 0,
  _TotalSubject: [],
  _setAerage() {
    let _TotalScore = 0;
    this._TotalSubject.forEach(e => {
      _TotalScore += e.score;
    });
    this._Average = (_TotalScore / this._TotalSubject.length).toFixed(2);
    this.aerageChangeCb && this.aerageChangeCb(this._Average);
  },
  _addSubject(subject) {
    try {
      this._TotalSubject.forEach(e => {
        if (e.code === subject.code) {
          throw new Error('你已经添加了这门课程');
        }
      })
      this._TotalSubject.push(subject);
      this.subjectChangeCb && this.subjectChangeCb(this._TotalSubject);
    } catch (e) {
      console.error(e)
    }
  },
  _removeSubject(subject) {
    this._TotalSubject = this._TotalSubject.filter(e => {
      return e.code !== subject.code;
    });
    this._setAerage();
    this.subjectChangeCb && this.subjectChangeCb(this._TotalSubject);
  },
  _editScore(subject) {
    this._TotalSubject = this._TotalSubject.map(e => {
      if (e.code === subject.code) {
        return subject;
      }
      return { ...e };
    });
    this._setAerage();
    this.subjectChangeCb && this.subjectChangeCb(this._TotalSubject);
  },
  aerageChangeCb: null,
  subjectChangeCb: null,
  async getMyScore(userInfo, subject) {
    const { name, email } = userInfo;
    const { label, score } = subject;
    const addedScore = parseInt((Math.ceil((Math.random() + 0.5) * 10)) + score, 10);

    return await new Promise((reslove, reject) => {
      setTimeout(() => { reslove({ msg: `你好 ${name} 同学， 你的科目(${label})的最终成绩为:${addedScore}, 成绩单我们已发送到:${email} 请注意查收!!`, scroe: addedScore }) }, 1000)
    })
  }
};

module.exports = server;
