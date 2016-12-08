package egovframework.moa.util.util;

public class MoaBibleEnum {

	public enum BibleShortOld
	{
		Gen("창"),
		Ex("출"),
		Lev("레"),
		Num("민"),
		Deut("신"),
		Josh("수"),
		Judg("삿"),
		Ruth("룻"),
		Sam1("삼상"),
		Sam2("삼하"),
		Kgs1("왕상"),
		Kgs2("왕하"),
		Chr1("대상"),
		Chr2("대하"),
		Ezra("스"),
		Neh("느"),
		Esth("에"),
		Job("욥"),
		Ps("시"),
		Prov("잠"),
		Eccl("전"),
		Song("아"),
		Is("사"),
		Jer("렘"),
		Lam("애"),
		Ezek("겔"),
		Dan("단"),
		Hos("호"),
		Joel("욜"),
		Amos("암"),
		Obad("옵"),
		Jon("욘"),
		Mic("미"),
		Nah("나"),
		Hab("합"),
		Zeph("습"),
		Hag("학"),
		Zech("슥"),
		Mal("말"),
		;
		
		private String bible;
		
		BibleShortOld( String b)
		{
			this.bible = b;
		}

		public String getBible() {
			return bible;
		}

		public void setBible(String bible) {
			this.bible = bible;
		}
	}

	public enum BibleShortNew
	{
		Mt("마"),
		Mk("막"),
		Lk("눅"),
		Jn("요"),
		Acts("행"),
		Rom("롬"),
		Cor1("고전"),
		Cor2("고후"),
		Gal("갈"),
		Eph("엡"),
		Phil("빌"),
		Col("골"),
		Thes1("살전"),
		Thes2("살후"),
		Tim1("딤전"),
		Tim2("딤후"),
		Tit("딛"),
		Phlm("몬"),
		Heb("히"),
		Jas("약"),
		Pet1("벧전"),
		Pet2("벧후"),
		Jn1("요일"),
		Jn2("요이"),
		Jn3("요삼"),
		Jude("유"),
		Rev("계")
		;
		
		private String bible;
		
		BibleShortNew( String b)
		{
			this.bible = b;
		}

		public String getBible() {
			return bible;
		}

		public void setBible(String bible) {
			this.bible = bible;
		}
	}
	
}
